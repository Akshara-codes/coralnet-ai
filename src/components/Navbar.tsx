import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Waves, BarChart3, Microscope, Users, Phone } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Waves },
    { name: 'Visualization', path: '/visualization', icon: BarChart3 },
    { name: 'Modules', path: '/modules', icon: Microscope },
    { name: 'About', path: '/about', icon: Users },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 glass-panel m-4 mx-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-primary/20 border border-primary/30 aqua-glow">
            <Waves className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient-aqua">Oceanopedia</h1>
            <p className="text-xs text-muted-foreground">AI-Driven Ocean Insights</p>
          </div>
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary/20 text-primary border border-primary/30 aqua-glow' 
                      : 'hover:bg-glass-bg/30 text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Login/Signup */}
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <motion.button
              className="glass-button text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>
          <Link to="/signup">
            <motion.button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary-glow transition-all duration-300 aqua-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Mobile menu - simplified for now */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm ${
                    isActive 
                      ? 'bg-primary/20 text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;