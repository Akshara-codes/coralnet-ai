import React from 'react';
import { motion } from 'framer-motion';
import oceanBg from '@/assets/ocean-background.jpg';

interface Bubble {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

const OceanBackground = () => {
  // Generate bubbles for animation
  const bubbles: Bubble[] = React.useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 4,
    })), []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main ocean gradient background */}
      <div className="absolute inset-0 bg-ocean-deep" />
      
      {/* Ocean image overlay */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${oceanBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Animated bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30"
          style={{
            left: `${bubble.x}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
          animate={{
            y: [window.innerHeight + 50, -50],
            opacity: [0, 0.6, 0.8, 0.6, 0],
            scale: [0.8, 1, 1.1, 1, 0.9],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle light rays */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-primary/30 via-primary/10 to-transparent transform -skew-x-12 animate-wave-pulse" />
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent transform skew-x-12 animate-wave-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Depth gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-deep/30 to-ocean-abyss/60" />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-ocean-abyss/40" />
    </div>
  );
};

export default OceanBackground;