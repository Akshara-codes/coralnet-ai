import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const oceanTemperatureData = [
  { year: 2000, temperature: 26.1 },
  { year: 2001, temperature: 26.2 },
  { year: 2002, temperature: 26.3 },
  { year: 2003, temperature: 26.4 },
  { year: 2004, temperature: 26.7 },
  { year: 2005, temperature: 26.9 },
  { year: 2006, temperature: 27.0 },
  { year: 2007, temperature: 27.2 },
  { year: 2008, temperature: 27.3 },
  { year: 2009, temperature: 27.5 },
  { year: 2010, temperature: 27.6 },
  { year: 2011, temperature: 27.8 },
  { year: 2012, temperature: 28.0 },
  { year: 2013, temperature: 28.1 },
  { year: 2014, temperature: 28.3 },
  { year: 2015, temperature: 28.4 },
  { year: 2016, temperature: 28.7 },
  { year: 2017, temperature: 28.8 },
  { year: 2018, temperature: 29.0 }
];

const chartConfig = {
  temperature: {
    label: "Average Temperature (°C)",
    color: "hsl(var(--primary))",
  },
};

const OceanTemperatureChart = () => {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={oceanTemperatureData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={['dataMin - 0.1', 'dataMax + 0.1']}
            tickFormatter={(value) => `${value}°C`}
          />
          <ChartTooltip 
            content={<ChartTooltipContent />}
            labelFormatter={(value) => `Year: ${value}`}
            formatter={(value: number) => [`${value.toFixed(1)}°C`, "Temperature"]}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ 
              fill: "hsl(var(--primary))", 
              strokeWidth: 2, 
              stroke: "hsl(var(--background))",
              r: 4 
            }}
            activeDot={{ 
              r: 6, 
              fill: "hsl(var(--primary))",
              stroke: "hsl(var(--background))",
              strokeWidth: 2
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default OceanTemperatureChart;