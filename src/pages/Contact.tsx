import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Globe } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submission:', formData);
    // Handle form submission logic
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Research Center',
      details: [
        'Centre for Marine Living Resources & Ecology',
        'Ministry of Earth Sciences, Government of India',
        'Kochi, Kerala 682 508, India'
      ]
    },
    {
      icon: Mail,
      title: 'Email Contact',
      details: [
        'research@cmlre.gov.in',
        'platform-support@marinebio.ai',
        'partnerships@marinebio.ai'
      ]
    },
    {
      icon: Phone,
      title: 'Phone Support',
      details: [
        '+91-484-2390814 (Main Office)',
        '+91-484-2390815 (Technical Support)',
        '+91-484-2390816 (Collaborations)'
      ]
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM IST',
        'Saturday: 9:00 AM - 1:00 PM IST',
        'Emergency Support: 24/7 Available'
      ]
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
            Contact Our Research Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with our marine biodiversity experts for collaborations, technical support, or research inquiries.
          </p>
        </motion.div>

        {/* API Documentation Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel p-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded-lg bg-primary/20 text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gradient-aqua">
                  API Documentation
                </h2>
                <p className="text-muted-foreground">
                  Complete developer resources for platform integration
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3 text-foreground">REST API</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Access marine biodiversity data through our comprehensive REST endpoints
                </p>
                <motion.button
                  className="w-full bg-primary/20 text-primary py-2 px-4 rounded-lg hover:bg-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View REST Docs
                </motion.button>
              </div>
              
              <div className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3 text-foreground">GraphQL API</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Query complex marine data relationships with flexible GraphQL interface
                </p>
                <motion.button
                  className="w-full bg-secondary/20 text-secondary py-2 px-4 rounded-lg hover:bg-secondary/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore GraphQL
                </motion.button>
              </div>
              
              <div className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-3 text-foreground">SDK & Libraries</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Python, R, and JavaScript libraries for seamless integration
                </p>
                <motion.button
                  className="w-full bg-accent/20 text-accent py-2 px-4 rounded-lg hover:bg-accent/30 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download SDKs
                </motion.button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <div className="p-1 rounded bg-primary/20">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">API Access Keys</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our team to obtain API credentials and access tokens for platform integration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gradient-aqua">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow"
                  placeholder="Dr. Priya Sharma"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow"
                  placeholder="priya.sharma@institution.edu"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">
                  Subject
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow"
                  required
                >
                  <option value="">Select inquiry type</option>
                  <option value="research-collaboration">Research Collaboration</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="data-access">Data Access Request</option>
                  <option value="platform-features">Platform Features</option>
                  <option value="training">Training & Workshops</option>
                  <option value="partnerships">Institutional Partnerships</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow resize-none"
                  placeholder="Tell us about your research interests, collaboration ideas, or technical questions..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary-glow transition-all duration-300 aqua-glow flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              
              return (
                <motion.div
                  key={info.title}
                  className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Location Map Placeholder */}
            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary/20 text-secondary">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Research Center Location
                </h3>
              </div>
              
              <div className="bg-glass-bg/20 rounded-lg h-48 flex items-center justify-center border border-glass-border/30">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">
                    Interactive map integration available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    CMLRE Campus, Kochi, Kerala
                  </p>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-muted-foreground">
                <p>🚗 30 minutes from Cochin International Airport</p>
                <p>🚢 15 minutes from Kochi Port</p>
                <p>🚇 Metro connectivity to major city areas</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Links Footer */}
        <motion.div
          className="mt-16 glass-panel p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gradient-aqua">
            Explore More Resources
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/docs" className="text-primary hover:text-primary-glow transition-colors px-4 py-2 rounded-lg hover:bg-primary/10">
              API Documentation
            </a>
            <a href="/tutorials" className="text-primary hover:text-primary-glow transition-colors px-4 py-2 rounded-lg hover:bg-primary/10">
              Platform Tutorials
            </a>
            <a href="/research" className="text-primary hover:text-primary-glow transition-colors px-4 py-2 rounded-lg hover:bg-primary/10">
              Research Publications
            </a>
            <a href="/partnerships" className="text-primary hover:text-primary-glow transition-colors px-4 py-2 rounded-lg hover:bg-primary/10">
              Partnership Opportunities
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;