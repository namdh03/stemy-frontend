import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useTicketDashboardData } from '~hooks/useTicketDashboardData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const TicketDashboard: React.FC = () => {
  const { data, isLoading } = useTicketDashboardData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { ticketCategoryData, ticketTrendData, ticketStatusData, replierPerformanceData, averageRating } = data!;

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
      <Card className='col-span-7'>
        <CardHeader>
          <CardTitle>Average Rating</CardTitle>
        </CardHeader>
        <CardContent className='text-center text-4xl font-bold'>{averageRating}</CardContent>
      </Card>
      <Card className='col-span-4'>
        <CardHeader>
          <CardTitle>Ticket Trend</CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <ResponsiveContainer width='100%' height={350}>
            <LineChart data={ticketTrendData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='tickets' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Ticket Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={350}>
            <PieChart>
              <Pie
                data={ticketCategoryData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {ticketCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='col-span-4'>
        <CardHeader>
          <CardTitle>Replier Performance</CardTitle>
        </CardHeader>
        <CardContent className='pl-2'>
          <ResponsiveContainer width='100%' height={350}>
            <BarChart data={replierPerformanceData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='resolvedTickets' fill='#8884d8' name='Resolved Tickets' />
              <Bar dataKey='totalTickets' fill='#82ca9d' name='Total Tickets' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='col-span-3'>
        <CardHeader>
          <CardTitle>Ticket Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={350}>
            <PieChart>
              <Pie
                data={ticketStatusData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {ticketStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDashboard;
