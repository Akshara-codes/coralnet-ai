import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Brain, FileText, MessageSquare, Microscope, Globe } from 'lucide-react';
import DashboardMetrics from '@/components/DashboardMetrics';
import coralReef from '@/assets/coral-reef.jpg';

const Landing = () => {
  const quickLinks = [
    {
      title: 'Data Visualization',
      description: 'Interactive dashboards and marine analytics',
      icon: BarChart3,
      path: '/visualization',
      color: 'primary'
    },
    {
      title: 'Research Modules',
      description: 'Taxonomy, eDNA, and morphology tools',
      icon: Microscope,
      path: '/modules',
      color: 'secondary'
    },
    {
      title: 'Policy Brief Generator',
      description: 'AI-powered research summaries',
      icon: FileText,
      path: '/policy',
      color: 'primary'
    },
    {
      title: 'AI Assistant',
      description: 'Marine data queries and insights',
      icon: MessageSquare,
      path: '#chatbot',
      color: 'secondary'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-gradient-aqua leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI-Driven Insights for India's Seas
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Advanced marine biodiversity platform empowering scientists, policymakers, and researchers with cutting-edge ocean analytics and ecosystem insights.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/visualization">
                <motion.button
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-glow transition-all duration-300 aqua-glow flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Ocean Data</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              
              <Link to="/about">
                <motion.button
                  className="glass-button text-lg font-semibold flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Globe className="w-5 h-5" />
                  <span>Learn More</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating coral reef visual */}
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 opacity-30 rounded-full overflow-hidden border border-primary/30"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          style={{
            backgroundImage: `url(${coralReef})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-aqua">
              Platform Analytics
            </h2>
            <DashboardMetrics />
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient-aqua">
              Research Tools & Features
            </h2>
            <p className="text-muted-foreground text-lg">
              Access powerful marine research capabilities and AI-driven insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    onClick={link.path === '#chatbot' ? (e) => {
                      e.preventDefault();
                      // This will trigger the chatbot when implemented
                    } : undefined}
                  >
                    <motion.div
                      className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300 group cursor-pointer h-full"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: link.color === 'primary' ? 'var(--glow-aqua)' : 'var(--glow-coral)'
                      }}
                    >
                      <div className={`p-3 rounded-lg mb-4 inline-block ${
                        link.color === 'primary' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-secondary/20 text-secondary'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm">
                        {link.description}
                      </p>
                      
                      <ArrowRight className="w-4 h-4 text-primary mt-4 transform group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="glass-panel p-12 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gradient-aqua">
              Ready to Dive Deeper?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join the marine research community and unlock the secrets of India's ocean ecosystems with AI-powered insights.
            </p>
            <Link to="/signup">
              <motion.button
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-glow transition-all duration-300 aqua-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Research Journey
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;