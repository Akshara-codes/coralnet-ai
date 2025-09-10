import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Eye, Award, Globe, Microscope } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Lead Marine Biologist',
      institution: 'CMLRE',
      expertise: 'Biodiversity Analytics',
      avatar: '👨‍🔬'
    },
    {
      name: 'Prof. Anita Sharma',
      role: 'AI Research Director',
      institution: 'MoES',
      expertise: 'Machine Learning',
      avatar: '👩‍💻'
    },
    {
      name: 'Dr. Vikram Patel',
      role: 'Ocean Data Specialist',
      institution: 'CSIR-NIO',
      expertise: 'Ecosystem Modeling',
      avatar: '🧑‍🔬'
    },
    {
      name: 'Dr. Priya Menon',
      role: 'Policy Integration Lead',
      institution: 'MoES',
      expertise: 'Environmental Policy',
      avatar: '👩‍💼'
    }
  ];

  const achievements = [
    {
      icon: Globe,
      title: 'Comprehensive Coverage',
      description: 'Complete Indian EEZ monitoring across 2.02 million sq km'
    },
    {
      icon: Microscope,
      title: 'Species Database',
      description: '15,000+ marine species documented with AI classification'
    },
    {
      icon: Award,
      title: 'Research Impact',
      description: '200+ peer-reviewed publications citing our platform'
    },
    {
      icon: Users,
      title: 'Active Researchers',
      description: '500+ scientists across 30+ institutions'
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-aqua">
            About Our Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pioneering AI-driven marine biodiversity research to protect and understand India's ocean ecosystems for future generations.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-primary/20 text-primary mr-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-aqua">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To revolutionize marine biodiversity research through cutting-edge AI technologies, empowering scientists and policymakers with actionable insights for sustainable ocean management and conservation across India's marine territories.
            </p>
          </motion.div>

          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-lg bg-secondary/20 text-secondary mr-4">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-gradient-aqua">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To establish India as a global leader in marine biodiversity science, creating a comprehensive digital twin of ocean ecosystems that enables predictive conservation strategies and evidence-based marine policy decisions.
            </p>
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-aqua">
            Platform Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  className="glass-panel p-6 text-center hover:bg-glass-bg/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-4 rounded-lg bg-primary/20 text-primary inline-block mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-aqua">
            Research Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="glass-panel p-6 text-center hover:bg-glass-bg/30 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                whileHover={{ scale: 1.02, boxShadow: 'var(--glow-aqua)' }}
              >
                <div className="text-4xl mb-4 p-4 rounded-full bg-primary/20 inline-block">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-semibold mb-1 text-foreground">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-1">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs mb-2">
                  {member.institution}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs">
                  {member.expertise}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnerships */}
        <motion.div
          className="glass-panel p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gradient-aqua">
            Institutional Partnerships
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Our platform is developed in collaboration with leading marine research institutions across India, fostering innovation and knowledge sharing in marine science.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 text-primary">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-medium">Centre for Marine Living Resources & Ecology (CMLRE)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="font-medium">Ministry of Earth Sciences (MoES)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-medium">CSIR - National Institute of Oceanography</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="font-medium">Indian National Centre for Ocean Information Services</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;