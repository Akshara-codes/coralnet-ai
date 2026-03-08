import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TreePine, Microscope, Dna, Fish, ArrowRight, Activity,
  TrendingUp, BarChart3, Globe, Waves, FlaskConical, Layers, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getModuleStats, getUserRecentActivity } from '@/lib/analysisService';
import { formatDistanceToNow } from 'date-fns';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const moduleConfig = [
  { id: 'taxonomy', title: 'Taxonomy Explorer', icon: TreePine, route: '/modules/taxonomy', label: 'Analyses', color: 'text-primary', bg: 'bg-primary/10' },
  { id: 'otolith', title: 'Otolith Morphology', icon: Microscope, route: '/modules/otolith', label: 'Analyses', color: 'text-secondary', bg: 'bg-secondary/10' },
  { id: 'edna', title: 'Environmental DNA', icon: Dna, route: '/modules/edna', label: 'Analyses', color: 'text-accent', bg: 'bg-accent/10' },
  { id: 'biodiversity', title: 'Biodiversity Assessment', icon: Fish, route: '/modules/biodiversity', label: 'Analyses', color: 'text-primary', bg: 'bg-primary/10' },
];

const moduleIcons: Record<string, React.ElementType> = {
  taxonomy: TreePine,
  otolith: Microscope,
  edna: Dna,
  biodiversity: Fish,
};

const moduleLabels: Record<string, string> = {
  taxonomy: 'Taxonomy',
  otolith: 'Otolith',
  edna: 'eDNA',
  biodiversity: 'Biodiversity',
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [moduleStats, setModuleStats] = useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [statsRes, activityRes] = await Promise.all([
        getModuleStats(),
        user ? getUserRecentActivity(8) : Promise.resolve({ data: [], error: null }),
      ]);
      if (statsRes.data) setModuleStats(statsRes.data);
      if (activityRes.data) setRecentActivity(activityRes.data);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const totalAnalyses = Object.values(moduleStats).reduce((a, b) => a + b, 0);
  const activeModules = Object.keys(moduleStats).length;

  const summaryStats = [
    { label: 'Total Analyses', value: totalAnalyses.toLocaleString(), icon: BarChart3, change: `${activeModules} modules used` },
    { label: 'Taxonomy', value: (moduleStats['taxonomy'] || 0).toLocaleString(), icon: TreePine, change: 'Species queries' },
    { label: 'Otolith', value: (moduleStats['otolith'] || 0).toLocaleString(), icon: Microscope, change: 'Samples analyzed' },
    { label: 'eDNA + Biodiversity', value: ((moduleStats['edna'] || 0) + (moduleStats['biodiversity'] || 0)).toLocaleString(), icon: Layers, change: 'Environmental analyses' },
  ];

  return (
    <div className="min-h-screen pt-4 pb-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-aqua mb-2">
            Research Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            {user ? 'Your research insights across all modules' : 'Sign in to track your research analyses'}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
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
                {moduleConfig.map((mod, i) => (
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
                            {moduleStats[mod.id] || 0}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-foreground mb-1">{moduleStats[mod.id] || 0}</p>
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

            {/* Two columns: Recent Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Recent Activity */}
              <motion.div {...fadeUp(0.5)} className="lg:col-span-3">
                <Card className="glass-panel h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Waves className="w-5 h-5 text-primary" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      {user ? 'Your latest analyses' : 'Sign in to see your activity'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {recentActivity.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-8 text-center">
                        {user ? 'No analyses yet. Try one of the research modules!' : 'Sign in to track your analyses.'}
                      </p>
                    ) : (
                      recentActivity.map((item: any, i: number) => {
                        const Icon = moduleIcons[item.module] || Globe;
                        return (
                          <div
                            key={item.id || i}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <div className="p-1.5 rounded-md bg-primary/10 mt-0.5">
                              <Icon className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground leading-snug truncate">
                                {item.summary}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {moduleLabels[item.module] || item.module} · {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Insights */}
              <motion.div {...fadeUp(0.55)} className="lg:col-span-2">
                <Card className="glass-panel h-full">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Module Overview
                    </CardTitle>
                    <CardDescription>Analysis distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {moduleConfig.map(mod => {
                      const count = moduleStats[mod.id] || 0;
                      const pct = totalAnalyses > 0 ? Math.round((count / totalAnalyses) * 100) : 0;
                      return (
                        <div key={mod.id} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2 text-foreground">
                              <mod.icon className={`w-4 h-4 ${mod.color}`} />
                              {mod.title}
                            </span>
                            <span className="text-muted-foreground">{count} ({pct}%)</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.6 }}
                            />
                          </div>
                        </div>
                      );
                    })}

                    {totalAnalyses === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Run analyses in any module to see stats here.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
