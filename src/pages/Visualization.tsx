import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3, TrendingUp, Globe, Layers, Clock, Box,
  LineChart, PieChart, Map, Activity, Zap, Eye, ChevronDown, ChevronUp
} from 'lucide-react';
import OceanTemperatureChart from '@/components/OceanTemperatureChart';
import SpeciesDistributionMap from '@/components/SpeciesDistributionMap';
import SpeciesCompositionChart from '@/components/SpeciesCompositionChart';
import TemporalPatternsChart from '@/components/TemporalPatternsChart';
import CorrelationMatrix from '@/components/CorrelationMatrix';
import VisualizationPanel from '@/components/VisualizationPanel';
import DataUploadPanel from '@/components/DataUploadPanel';

const visualizationTypes = [
  {
    id: '3d-viz',
    title: '3D Visualizations',
    description: 'Interactive 3D models and immersive data exploration',
    icon: Box,
    features: ['Ocean depth modeling', '3D species distribution', 'Underwater terrain mapping', 'Interactive ecosystem models'],
    color: 'from-primary/20 to-primary/5',
    badge: 'Advanced',
  },
  {
    id: 'time-series',
    title: 'Time Series Analysis',
    description: 'Temporal data analysis with trend detection and forecasting',
    icon: TrendingUp,
    features: ['Historical trend analysis', 'Seasonal pattern detection', 'Predictive modeling', 'Anomaly detection'],
    color: 'from-secondary/20 to-secondary/5',
    badge: 'Real-time',
  },
  {
    id: 'spatial',
    title: 'Spatial Mapping',
    description: 'Geographic information systems and spatial data visualization',
    icon: Map,
    features: ['Interactive heat maps', 'Species distribution maps', 'Ocean current visualization', 'Environmental layers'],
    color: 'from-accent/20 to-accent/5',
    badge: 'GIS',
  },
  {
    id: 'analytics',
    title: 'Statistical Analytics',
    description: 'Advanced statistical analysis and correlation studies',
    icon: BarChart3,
    features: ['Correlation matrices', 'Principal component analysis', 'Clustering algorithms', 'Statistical significance testing'],
    color: 'from-primary-glow/20 to-primary-glow/5',
    badge: 'AI-Powered',
  },
];

const dashboardCards = [
  { title: 'Active Datasets', value: '247', change: '+12%', icon: Layers },
  { title: 'Real-time Sensors', value: '89', change: '+5%', icon: Activity },
  { title: 'Processing Speed', value: '2.3s', change: '-15%', icon: Zap },
  { title: 'Data Points', value: '1.2M', change: '+28%', icon: Eye },
];

const Visualization = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedViz, setExpandedViz] = useState<string | null>(null);

  const toggleViz = (id: string) => {
    setExpandedViz(prev => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-aqua">Data Visualization Hub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform complex marine data into actionable insights through advanced visualization techniques
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Card key={index} className="glass-panel">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{card.title}</p>
                        <p className="text-2xl font-bold">{card.value}</p>
                        <p className="text-sm text-primary">{card.change}</p>
                      </div>
                      <card.icon className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <LineChart className="w-5 h-5" />
                    <span>Ocean Temperature Trends (2000-2020)</span>
                  </CardTitle>
                  <CardDescription>Historical ocean temperature data showing warming trends</CardDescription>
                </CardHeader>
                <CardContent><OceanTemperatureChart /></CardContent>
              </Card>
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Species Distribution Map</span>
                  </CardTitle>
                  <CardDescription>Geographic distribution with coordinate-based plotting</CardDescription>
                </CardHeader>
                <CardContent><SpeciesDistributionMap /></CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Visualizations Tab */}
          <TabsContent value="visualizations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visualizationTypes.map((viz, index) => {
                const isExpanded = expandedViz === viz.id;
                return (
                  <motion.div
                    key={viz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={isExpanded ? 'md:col-span-2' : ''}
                  >
                    <Card className="glass-panel h-full">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${viz.color}`}>
                              <viz.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-xl">{viz.title}</CardTitle>
                            </div>
                          </div>
                          <Badge variant="secondary">{viz.badge}</Badge>
                        </div>
                        <CardDescription className="text-base">{viz.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {!isExpanded && (
                          <div className="space-y-2">
                            {viz.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <VisualizationPanel id={viz.id} />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Button
                          className="w-full"
                          variant={isExpanded ? 'outline' : 'default'}
                          onClick={() => toggleViz(viz.id)}
                        >
                          {isExpanded ? (
                            <><ChevronUp className="w-4 h-4 mr-2" /> Collapse</>
                          ) : (
                            <><ChevronDown className="w-4 h-4 mr-2" /> Launch Visualization</>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Species Composition</span>
                  </CardTitle>
                  <CardDescription>Distribution across marine taxonomic groups</CardDescription>
                </CardHeader>
                <CardContent><SpeciesCompositionChart /></CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Temporal Patterns</span>
                  </CardTitle>
                  <CardDescription>Seasonal abundance of plankton and fish larvae</CardDescription>
                </CardHeader>
                <CardContent><TemporalPatternsChart /></CardContent>
              </Card>

              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>Correlation Matrix</span>
                  </CardTitle>
                  <CardDescription>Environmental variable correlations</CardDescription>
                </CardHeader>
                <CardContent><CorrelationMatrix /></CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Visualization;
