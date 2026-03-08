import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TreePine, Microscope, Dna, Fish, ArrowRight, Activity,
  TrendingUp, BarChart3, Globe, Waves, FlaskConical, Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const modules = [
  {
    id: 'taxonomy',
    title: 'Taxonomy Explorer',
    icon: TreePine,
    route: '/modules/taxonomy',
    stat: '2,847',
    label: 'Species Catalogued',
    trend: '+12%',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    id: 'otolith',
    title: 'Otolith Morphology',
    icon: Microscope,
    route: '/modules/otolith',
    stat: '1,234',
    label: 'Samples Analyzed',
    trend: '+8%',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
  },
  {
    id: 'edna',
    title: 'Environmental DNA',
    icon: Dna,
    route: '/modules/edna',
    stat: '568',
    label: 'Sequences Matched',
    trend: '+23%',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity Assessment',
    icon: Fish,
    route: '/modules/biodiversity',
    stat: '89',
    label: 'Ecosystems Assessed',
    trend: '+5%',
    color: 'text-primary-glow',
    bg: 'bg-primary/10',
  },
];

const summaryStats = [
  { label: 'Total Analyses', value: '4,738', icon: BarChart3, change: '+18% this month' },
  { label: 'Active Surveys', value: '24', icon: Globe, change: '6 regions covered' },
  { label: 'Species Identified', value: '2,847', icon: Layers, change: '142 new this quarter' },
  { label: 'Ecosystem Health', value: '7.2/10', icon: Activity, change: 'Stable trend' },
];

const recentActivity = [
  { module: 'Taxonomy', action: 'Identified Amphiprion ocellaris with 96% confidence', time: '2 min ago', icon: TreePine },
  { module: 'Otolith', action: 'Age estimation: 4.5 years for Gadus morhua sample', time: '15 min ago', icon: Microscope },
  { module: 'eDNA', action: 'COI barcode matched to Thunnus albacares (98% match)', time: '1 hr ago', icon: Dna },
  { module: 'Biodiversity', action: 'Shannon index H\'=3.21 for Coral Triangle survey', time: '3 hrs ago', icon: Fish },
  { module: 'Taxonomy', action: 'New species record added: Pseudanthias pleurotaenia', time: '5 hrs ago', icon: TreePine },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-4 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-aqua mb-2">
            Research Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Aggregated insights across all marine research modules
          </p>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryStats.map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp(i * 0.08)}>
              <Card className="glass-panel hover-scale">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-primary mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Module Cards */}
        <motion.div {...fadeUp(0.3)} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-primary" />
            Research Modules
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod, i) => (
              <motion.div key={mod.id} {...fadeUp(0.35 + i * 0.08)}>
                <Card
                  className="glass-panel hover-scale cursor-pointer group"
                  onClick={() => navigate(mod.route)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2.5 rounded-lg ${mod.bg}`}>
                        <mod.icon className={`w-5 h-5 ${mod.color}`} />
                      </div>
                      <span className="text-xs font-medium text-primary flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {mod.trend}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground mb-1">{mod.stat}</p>
                    <p className="text-xs text-muted-foreground mb-1">{mod.label}</p>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                      {mod.title}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two columns: Recent Activity + Quick Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Recent Activity */}
          <motion.div {...fadeUp(0.5)} className="lg:col-span-3">
            <Card className="glass-panel h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Waves className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest analyses across all modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="p-1.5 rounded-md bg-primary/10 mt-0.5">
                      <item.icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.module} · {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Insights */}
          <motion.div {...fadeUp(0.55)} className="lg:col-span-2">
            <Card className="glass-panel h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Quick Insights
                </CardTitle>
                <CardDescription>Key findings summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm font-medium text-primary mb-1">🌊 Ecosystem Alert</p>
                  <p className="text-xs text-muted-foreground">
                    Coral Triangle biodiversity index dropped 0.3 points — declining parrotfish populations may indicate reef stress.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                  <p className="text-sm font-medium text-secondary mb-1">🧬 eDNA Discovery</p>
                  <p className="text-xs text-muted-foreground">
                    12S rRNA metabarcoding detected 3 previously unrecorded species in Mediterranean sampling sites.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/5 border border-accent/20">
                  <p className="text-sm font-medium text-accent mb-1">🔬 Otolith Milestone</p>
                  <p className="text-xs text-muted-foreground">
                    Age estimation accuracy reached 94% for Atlantic cod samples using the updated morphometric model.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm font-medium text-foreground mb-1">📊 Taxonomy Update</p>
                  <p className="text-xs text-muted-foreground">
                    142 new species records added this quarter, primarily from Indo-Pacific reef surveys.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
