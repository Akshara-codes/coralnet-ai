import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { month: 'Jan', phytoplankton: 82, zooplankton: 65, fish: 48 },
  { month: 'Feb', phytoplankton: 78, zooplankton: 60, fish: 45 },
  { month: 'Mar', phytoplankton: 95, zooplankton: 72, fish: 52 },
  { month: 'Apr', phytoplankton: 120, zooplankton: 88, fish: 58 },
  { month: 'May', phytoplankton: 135, zooplankton: 95, fish: 65 },
  { month: 'Jun', phytoplankton: 110, zooplankton: 82, fish: 70 },
  { month: 'Jul', phytoplankton: 90, zooplankton: 75, fish: 68 },
  { month: 'Aug', phytoplankton: 85, zooplankton: 70, fish: 62 },
  { month: 'Sep', phytoplankton: 100, zooplankton: 78, fish: 55 },
  { month: 'Oct', phytoplankton: 115, zooplankton: 85, fish: 50 },
  { month: 'Nov', phytoplankton: 105, zooplankton: 80, fish: 47 },
  { month: 'Dec', phytoplankton: 88, zooplankton: 68, fish: 44 },
];

const chartConfig = {
  phytoplankton: { label: 'Phytoplankton', color: 'hsl(160, 60%, 45%)' },
  zooplankton: { label: 'Zooplankton', color: 'hsl(var(--primary))' },
  fish: { label: 'Fish Larvae', color: 'hsl(220, 60%, 55%)' },
};

const TemporalPatternsChart = () => (
  <ChartContainer config={chartConfig} className="h-56 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="phytoplankton" stackId="1" stroke="hsl(160, 60%, 45%)" fill="hsl(160, 60%, 45%)" fillOpacity={0.3} strokeWidth={2} />
        <Area type="monotone" dataKey="zooplankton" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} strokeWidth={2} />
        <Area type="monotone" dataKey="fish" stackId="1" stroke="hsl(220, 60%, 55%)" fill="hsl(220, 60%, 55%)" fillOpacity={0.3} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </ChartContainer>
);

export default TemporalPatternsChart;
