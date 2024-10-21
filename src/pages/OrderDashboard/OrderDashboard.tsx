'use client';

import { useMemo, useState } from 'react';
import { DollarSign, Package, ShoppingCart, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { OrderStatus } from '~graphql/graphql';
import { useGetOrderDashboardData } from '~hooks/useGetOrderDashboardData';
import { formatCurrency } from '~utils/formatCurrency';

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.Delivering]: 'text-yellow-500',
  [OrderStatus.Delivered]: 'text-green-500',
  [OrderStatus.Unpaid]: 'text-red-500',
  [OrderStatus.Paid]: 'text-blue-500',
  [OrderStatus.Rated]: 'text-purple-500',
  [OrderStatus.Received]: 'text-green-500',
};

export default function OrderDashboard() {
  const { data: orders, isLoading, error } = useGetOrderDashboardData();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const { totalRevenue, orderStatusDistribution, revenueOverTime, topProducts } = useMemo(() => {
    const totalRevenue = orders?.reduce((sum, order) => sum + order.totalPrice, 0);

    const orderStatusDistribution = orders?.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<OrderStatus, number>,
    );

    const revenueByDate = orders?.reduce(
      (acc, order) => {
        const date = new Date(order.createdAt).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + order.totalPrice;
        return acc;
      },
      {} as Record<string, number>,
    );

    const revenueOverTime = Object.entries(revenueByDate || {})
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const productSales = orders
      ?.flatMap((order) =>
        order.orderItems.map((item) => ({
          name: item.product.name,
          sales: item.quantity,
          revenue: item.productPrice * item.quantity,
        })),
      )
      .reduce(
        (acc, { name, sales, revenue }) => {
          if (!acc[name]) acc[name] = { sales: 0, revenue: 0 };
          acc[name].sales += sales;
          acc[name].revenue += revenue;
          return acc;
        },
        {} as Record<string, { sales: number; revenue: number }>,
      );

    const topProducts = Object.entries(productSales || {})
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      totalRevenue,
      orderStatusDistribution,
      revenueOverTime,
      topProducts,
    };
  }, [orders, dateRange]);

  if (isLoading) {
    return <Skeleton className='w-full h-screen' />;
  }

  if (error) {
    return <div>Error loading dashboard data. Please try again later.</div>;
  }

  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
        {/* <DateRangePicker ranges={dateRange} onChange={(item) => setDateRange([item.selection])} /> */}
      </div>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
                <DollarSign className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {(totalRevenue || 0 / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Total Orders</CardTitle>
                <ShoppingCart className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{orders?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Delivered Orders</CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{orderStatusDistribution?.[OrderStatus.Delivered] || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Average Order Value</CardTitle>
                <TrendingUp className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {((totalRevenue || 0) / (orders?.length || 0)).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <ResponsiveContainer width='100%' height={350}>
                  <LineChart data={revenueOverTime}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='revenue' name='Revenue' stroke='#8884d8' activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Top selling products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={350}>
                  <BarChart data={topProducts}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='revenue' name='Revenue' fill='#8884d8' />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Showing the {showAllOrders ? 'all' : 'last 5'} orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className='w-[100px]'>Order ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(showAllOrders ? orders : orders?.slice(0, 5))?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className='font-medium'>{order.id}</TableCell>
                      <TableCell className={statusColors[order.status]}>{order.status}</TableCell>
                      <TableCell>{order.fullName}</TableCell>
                      <TableCell className='text-right'>{formatCurrency(order.totalPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button onClick={() => setShowAllOrders(!showAllOrders)} className='mt-4'>
                {showAllOrders ? 'Show Less' : 'Show All'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
