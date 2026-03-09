import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const depthData = [
  { zone: 'Epipelagic\n0-200m', species: 320, temp: 25, light: 100 },
  { zone: 'Mesopelagic\n200-1000m', species: 180, temp: 12, light: 20 },
  { zone: 'Bathypelagic\n1-4km', species: 85, temp: 4, light: 1 },
  { zone: 'Abyssopelagic\n4-6km', species: 40, temp: 2, light: 0 },
  { zone: 'Hadal\n6km+', species: 15, temp: 1, light: 0 },
];

const radarData = [
  { metric: 'Biodiversity', reef: 95, openOcean: 40, deepSea: 25 },
  { metric: 'Biomass', reef: 80, openOcean: 60, deepSea: 30 },
  { metric: 'Endemism', reef: 70, openOcean: 20, deepSea: 65 },
  { metric: 'Resilience', reef: 35, openOcean: 75, deepSea: 85 },
  { metric: 'Connectivity', reef: 50, openOcean: 90, deepSea: 15 },
  { metric: 'Productivity', reef: 85, openOcean: 55, deepSea: 10 },
];

const barConfig = { species: { label: 'Species Count', color: 'hsl(var(--primary))' } };
const radarConfig = {
  reef: { label: 'Coral Reef', color: 'hsl(var(--primary))' },
  openOcean: { label: 'Open Ocean', color: 'hsl(187, 72%, 45%)' },
  deepSea: { label: 'Deep Sea', color: 'hsl(260, 50%, 55%)' },
};

type VizMode = 'depth' | 'ecosystem';

const VisualizationPanel = ({ id }: { id: string }) => {
  const [mode, setMode] = useState<VizMode>('depth');

  if (id === '3d-viz') {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant={mode === 'depth' ? 'default' : 'outline'} onClick={() => setMode('depth')}>Depth Zones</Button>
          <Button size="sm" variant={mode === 'ecosystem' ? 'default' : 'outline'} onClick={() => setMode('ecosystem')}>Ecosystem Radar</Button>
        </div>
        <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {mode === 'depth' ? (
            <ChartContainer config={barConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={depthData} layout="vertical" margin={{ left: 30, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="zone" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} width={90} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="species" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <ChartContainer config={radarConfig} className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" opacity={0.4} />
                  <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                  <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" fontSize={9} />
                  <Radar name="Coral Reef" dataKey="reef" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                  <Radar name="Open Ocean" dataKey="openOcean" stroke="hsl(187, 72%, 45%)" fill="hsl(187, 72%, 45%)" fillOpacity={0.15} strokeWidth={2} />
                  <Radar name="Deep Sea" dataKey="deepSea" stroke="hsl(260, 50%, 55%)" fill="hsl(260, 50%, 55%)" fillOpacity={0.15} strokeWidth={2} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </motion.div>
      </div>
    );
  }

  if (id === 'time-series') {
    const trendData = Array.from({ length: 24 }, (_, i) => ({
      month: `${2022 + Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, '0')}`,
      sst: 27.5 + Math.sin(i * 0.5) * 1.8 + i * 0.03,
      chlorophyll: 0.8 + Math.cos(i * 0.5) * 0.4 + Math.random() * 0.1,
    }));
    const trendConfig = {
      sst: { label: 'SST (°C)', color: 'hsl(var(--primary))' },
      chlorophyll: { label: 'Chlor-a (mg/m³)', color: 'hsl(160, 60%, 45%)' },
    };
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">24 months</Badge>
          <Badge variant="outline">2 variables</Badge>
          <Badge className="bg-primary/10 text-primary border-primary/30">Live trend</Badge>
        </div>
        <ChartContainer config={trendConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} margin={{ top: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={9} tickLine={false} axisLine={false} interval={3} />
              <YAxis yAxisId="left" stroke="hsl(var(--primary))" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(160, 60%, 45%)" fontSize={10} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar yAxisId="left" dataKey="sst" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} opacity={0.8} />
              <Bar yAxisId="right" dataKey="chlorophyll" fill="hsl(160, 60%, 45%)" radius={[3, 3, 0, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    );
  }

  if (id === 'spatial') {
    const heatData = Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 10 }, (_, col) => ({
        row, col,
        value: Math.round(50 + Math.sin(row * 0.8) * 30 + Math.cos(col * 0.6) * 20 + Math.random() * 10),
      }))
    ).flat();
    const getHeatColor = (v: number) => {
      if (v >= 85) return 'bg-red-500/80';
      if (v >= 70) return 'bg-orange-400/70';
      if (v >= 55) return 'bg-yellow-400/60';
      if (v >= 40) return 'bg-emerald-400/50';
      return 'bg-sky-400/40';
    };
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline">8×10 grid</Badge>
          <Badge className="bg-primary/10 text-primary border-primary/30">Species density</Badge>
        </div>
        <div className="grid grid-cols-10 gap-0.5">
          {heatData.map((cell, i) => (
            <div
              key={i}
              className={`aspect-square rounded-sm ${getHeatColor(cell.value)} transition-colors hover:ring-2 hover:ring-primary cursor-crosshair`}
              title={`(${cell.col + 1}, ${cell.row + 1}): ${cell.value} species`}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
          <div className="w-3 h-3 rounded bg-sky-400/40" /> Low
          <div className="w-3 h-3 rounded bg-emerald-400/50" />
          <div className="w-3 h-3 rounded bg-yellow-400/60" />
          <div className="w-3 h-3 rounded bg-orange-400/70" />
          <div className="w-3 h-3 rounded bg-red-500/80" /> High
        </div>
      </div>
    );
  }

  if (id === 'analytics') {
    const statsData = [
      { label: 'Shannon Index', value: 3.42, desc: 'Species diversity', status: 'High' },
      { label: 'Simpson Index', value: 0.91, desc: 'Dominance measure', status: 'High' },
      { label: 'Margalef Index', value: 8.7, desc: 'Species richness', status: 'Medium' },
      { label: 'Pielou Evenness', value: 0.78, desc: 'Distribution equality', status: 'Medium' },
      { label: 'Berger-Parker', value: 0.15, desc: 'Dominance index', status: 'Low' },
      { label: 'Fisher Alpha', value: 12.3, desc: 'Log-series diversity', status: 'High' },
    ];
    const statusColor: Record<string, string> = {
      High: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Low: 'bg-primary/10 text-primary border-primary/30',
    };
    return (
      <div className="grid grid-cols-2 gap-3">
        {statsData.map((s) => (
          <div key={s.label} className="p-3 rounded-lg bg-muted/20 border border-border/30 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <Badge variant="outline" className={`text-[10px] ${statusColor[s.status]}`}>{s.status}</Badge>
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default VisualizationPanel;
