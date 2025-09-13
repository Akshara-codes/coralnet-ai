import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const speciesData = [
  { 
    longitude: 72.8, 
    latitude: 8.5, 
    species: 'Tuna',
    color: '#dc2626' // red-600
  },
  { 
    longitude: 75, 
    latitude: 12, 
    species: 'Mackerel',
    color: '#ea580c' // orange-600
  },
  { 
    longitude: 76.5, 
    latitude: 18, 
    species: 'Shark',
    color: '#7c3aed' // violet-600
  },
  { 
    longitude: 79, 
    latitude: 10.2, 
    species: 'Sardine',
    color: '#059669' // emerald-600
  },
  { 
    longitude: 80, 
    latitude: 15.5, 
    species: 'Anchovy',
    color: '#0284c7' // sky-600
  }
];

const chartConfig = {
  longitude: {
    label: "Longitude",
    color: "hsl(var(--primary))",
  },
  latitude: {
    label: "Latitude", 
    color: "hsl(var(--secondary))",
  },
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background/95 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-foreground">{data.species}</p>
        <p className="text-sm text-muted-foreground">
          Longitude: {data.longitude}°
        </p>
        <p className="text-sm text-muted-foreground">
          Latitude: {data.latitude}°
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  return (
    <g>
      {/* Outer glow effect */}
      <circle
        cx={cx}
        cy={cy}
        r={12}
        fill={payload.color}
        fillOpacity={0.2}
        className="animate-pulse"
      />
      {/* Main dot */}
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={payload.color}
        stroke="hsl(var(--background))"
        strokeWidth={2}
        className="cursor-pointer hover:r-8 transition-all"
      />
      {/* Center highlight */}
      <circle
        cx={cx}
        cy={cy}
        r={2}
        fill="white"
        fillOpacity={0.8}
      />
    </g>
  );
};

const SpeciesDistributionMap = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          data={speciesData}
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="hsl(var(--border))" 
            opacity={0.3} 
          />
          <XAxis 
            type="number"
            dataKey="longitude"
            domain={['dataMin - 1', 'dataMax + 1']}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
            label={{ 
              value: 'Longitude', 
              position: 'insideBottom', 
              offset: -10,
              style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
            }}
          />
          <YAxis 
            type="number"
            dataKey="latitude"
            domain={['dataMin - 1', 'dataMax + 1']}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
            label={{ 
              value: 'Latitude', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Scatter 
            dataKey="latitude"
            shape={<CustomDot />}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SpeciesDistributionMap;