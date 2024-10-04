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

// Mock data - replace with your actual data
const ticketTypeData = [
  { name: 'Report', value: 400 },
  { name: 'Support', value: 300 },
];

const ticketTrendData = [
  { name: 'Jan', tickets: 40 },
  { name: 'Feb', tickets: 30 },
  { name: 'Mar', tickets: 45 },
  { name: 'Apr', tickets: 50 },
  { name: 'May', tickets: 65 },
  { name: 'Jun', tickets: 60 },
];

const staffPerformanceData = [
  { name: 'Alice', resolvedTickets: 120 },
  { name: 'Bob', resolvedTickets: 98 },
  { name: 'Charlie', resolvedTickets: 86 },
  { name: 'Diana', resolvedTickets: 99 },
];

const responseTimeData = [
  { name: 'Report', avgTime: 4 },
  { name: 'Support', avgTime: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function TicketDashboard() {
  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-6'>Ticket Management Dashboard</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>700</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>42</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Avg. Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>3.2 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>92%</div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Ticket Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={ticketTypeData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ticketTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Creation Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <LineChart data={ticketTrendData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type='monotone' dataKey='tickets' stroke='#8884d8' activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={staffPerformanceData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='resolvedTickets' fill='#82ca9d' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Response Time by Ticket Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={responseTimeData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='avgTime' fill='#8884d8' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
