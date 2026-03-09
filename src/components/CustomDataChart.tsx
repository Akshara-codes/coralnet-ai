import React from 'react';
import {
  BarChart, Bar, LineChart, Line, ScatterChart, Scatter,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const COLORS = [
  'hsl(var(--primary))',
  'hsl(187, 72%, 45%)',
  'hsl(260, 50%, 55%)',
  'hsl(160, 60%, 45%)',
  'hsl(30, 80%, 55%)',
  'hsl(340, 65%, 50%)',
  'hsl(45, 85%, 50%)',
  'hsl(200, 70%, 50%)',
];

type Props = {
  data: Record<string, string | number>[];
  chartType: 'bar' | 'line' | 'scatter' | 'pie';
  xKey: string;
  yKey: string;
};

const CustomDataChart = ({ data, chartType, xKey, yKey }: Props) => {
  const config = {
    [yKey]: { label: yKey, color: 'hsl(var(--primary))' },
  };

  const axisProps = {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 11,
    tickLine: false,
    axisLine: false,
  };

  if (chartType === 'pie') {
    const pieData = data.slice(0, 12).map(row => ({
      name: String(row[xKey] ?? ''),
      value: Number(row[yKey]) || 0,
    }));

    return (
      <ChartContainer config={config} className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={40} paddingAngle={2} label={({ name }) => name}>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  }

  if (chartType === 'scatter') {
    return (
      <ChartContainer config={config} className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey={xKey} name={xKey} {...axisProps} type="number" />
            <YAxis dataKey={yKey} name={yKey} {...axisProps} type="number" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="hsl(var(--primary))" />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  }

  if (chartType === 'line') {
    return (
      <ChartContainer config={config} className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey={xKey} {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip />
            <Line type="monotone" dataKey={yKey} stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  }

  // Bar chart (default)
  return (
    <ChartContainer config={config} className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis dataKey={xKey} {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip />
          <Bar dataKey={yKey} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default CustomDataChart;
