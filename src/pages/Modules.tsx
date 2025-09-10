import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Microscope, Fish, Dna, TreePine, ArrowRight, Search, Upload, BarChart3 } from 'lucide-react';

const Modules = () => {
  const modules = [
    {
      id: 'taxonomy',
      title: 'Taxonomy Explorer',
      description: 'Comprehensive species identification and classification system with AI-powered assistance',
      icon: TreePine,
      features: ['Hierarchical species tree', 'AI-assisted identification', 'Visual morphology comparison', 'Expert validation system'],
      color: 'from-primary/20 to-primary/5'
    },
    {
      id: 'otolith',
      title: 'Otolith Morphology',
      description: 'Advanced otolith shape analysis and morphometric measurements for fish age determination',
      icon: Microscope,
      features: ['Image upload & processing', 'Automated shape analysis', 'Morphometric measurements', 'Age estimation models'],
      color: 'from-secondary/20 to-secondary/5'
    },
    {
      id: 'edna',
      title: 'Environmental DNA (eDNA)',
      description: 'Molecular sequencing analysis for biodiversity assessment and species detection',
      icon: Dna,
      features: ['Sequence upload & matching', 'Species identification', 'Confidence scoring', 'Phylogenetic analysis'],
      color: 'from-accent/20 to-accent/5'
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity Assessment',
      description: 'Comprehensive ecosystem health metrics and biodiversity index calculations',
      icon: Fish,
      features: ['Species diversity indices', 'Ecosystem health scoring', 'Population trend analysis', 'Conservation status tracking'],
      color: 'from-primary-glow/20 to-primary-glow/5'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-aqua">
            Research Modules
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI-powered tools for marine biodiversity research and analysis
          </p>
        </motion.div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="glass-panel hover-scale cursor-pointer group h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${module.color} group-hover:scale-110 transition-transform`}>
                      <module.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {module.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full group-hover:bg-primary/20 transition-colors">
                    Launch Module
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Search className="w-5 h-5" />
              <span>Search Species</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <Upload className="w-5 h-5" />
              <span>Upload Data</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-2">
              <BarChart3 className="w-5 h-5" />
              <span>View Analytics</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Modules;