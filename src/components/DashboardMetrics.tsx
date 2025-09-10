import React from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, Brain, TrendingUp } from 'lucide-react';

const DashboardMetrics = () => {
  const metrics = [
    {
      title: 'Datasets Integrated',
      value: '2,847',
      change: '+12%',
      icon: Database,
      color: 'primary',
      description: 'Marine biodiversity datasets'
    },
    {
      title: 'Ecosystem Health Index',
      value: '78.2',
      change: '+5.4%',
      icon: Activity,
      color: 'secondary',
      description: 'Overall ocean health score'
    },
    {
      title: 'AI Analyses Completed',
      value: '15,934',
      change: '+23%',
      icon: Brain,
      color: 'primary',
      description: 'Species pattern analyses'
    },
    {
      title: 'Research Impact Score',
      value: '94.7',
      change: '+8.1%',
      icon: TrendingUp,
      color: 'secondary',
      description: 'Policy influence metric'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        
        return (
          <motion.div
            key={metric.title}
            className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: metric.color === 'primary' ? 'var(--glow-aqua)' : 'var(--glow-coral)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-2 rounded-lg ${
                    metric.color === 'primary' 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-secondary/20 text-secondary'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {metric.title}
                </h3>
                
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-2xl font-bold text-foreground">
                    {metric.value}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    metric.change.startsWith('+') 
                      ? 'text-primary bg-primary/20' 
                      : 'text-secondary bg-secondary/20'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </div>

            {/* Subtle animation lines */}
            <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;