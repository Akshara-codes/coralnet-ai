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

        {/* Project Milestones Timeline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient-aqua">
            Project Milestones
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/30 hidden md:block" />

            {[
              {
                year: '2019',
                title: 'Project Inception',
                description: 'CMLRE initiated the AI-driven marine biodiversity platform under the Ministry of Earth Sciences.',
                side: 'left' as const,
              },
              {
                year: '2020',
                title: 'eDNA Module Launch',
                description: 'Environmental DNA analysis pipeline deployed for metabarcoding-based species detection.',
                side: 'right' as const,
              },
              {
                year: '2021',
                title: 'Otolith AI Classification',
                description: 'Deep learning model trained on 10,000+ otolith images for automated fish species identification.',
                side: 'left' as const,
              },
              {
                year: '2022',
                title: 'EEZ-Wide Monitoring',
                description: 'Platform coverage expanded to all sectors of India\'s 2.02M sq km Exclusive Economic Zone.',
                side: 'right' as const,
              },
              {
                year: '2023',
                title: 'Taxonomy Explorer',
                description: 'AI-powered taxonomic classification tool released with 15,000+ species in the database.',
                side: 'left' as const,
              },
              {
                year: '2024',
                title: 'Public Platform Release',
                description: 'Full platform opened to 500+ researchers across 30+ institutions with real-time analytics.',
                side: 'right' as const,
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex items-center mb-10 md:mb-12 ${
                  milestone.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
                initial={{ opacity: 0, x: milestone.side === 'left' ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.15 }}
              >
                <div className={`md:w-5/12 ${milestone.side === 'left' ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                  <div className="glass-panel p-5 hover:bg-glass-bg/30 transition-all duration-300">
                    <span className="text-xs font-bold text-primary tracking-wider uppercase">{milestone.year}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex md:w-2/12 justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/40 ring-4 ring-primary/20" />
                </div>

                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;