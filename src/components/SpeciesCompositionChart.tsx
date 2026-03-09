import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const data = [
  { name: 'Reef Fish', value: 340, color: 'hsl(var(--primary))' },
  { name: 'Pelagic', value: 210, color: 'hsl(187, 72%, 45%)' },
  { name: 'Demersal', value: 175, color: 'hsl(200, 65%, 55%)' },
  { name: 'Cephalopods', value: 95, color: 'hsl(160, 50%, 45%)' },
  { name: 'Crustaceans', value: 130, color: 'hsl(220, 60%, 50%)' },
  { name: 'Marine Mammals', value: 50, color: 'hsl(280, 45%, 55%)' },
];

const chartConfig = { species: { label: 'Species', color: 'hsl(var(--primary))' } };

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    const total = data.reduce((s, i) => s + i.value, 0);
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{d.name}</p>
        <p className="text-sm text-muted-foreground">{d.value} species ({((d.value / total) * 100).toFixed(1)}%)</p>
      </div>
    );
  }
  return null;
};

const SpeciesCompositionChart = () => (
  <div>
    <ChartContainer config={chartConfig} className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
          {d.name}
        </div>
      ))}
    </div>
  </div>
);

export default SpeciesCompositionChart;
