import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Maximize2, Minimize2 } from 'lucide-react';

const ChatbotOctopus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🐙 Hello! I'm your marine research assistant. How can I help you explore our ocean data today?",
      isBot: true
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "🐙 I'm processing your marine data query. This feature will provide AI-powered insights about biodiversity patterns, species correlations, and ecosystem health metrics.",
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Octopus Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 aqua-glow"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ 
          scale: 1.1,
          rotateZ: [0, -5, 5, 0],
          transition: { duration: 0.6 }
        }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-2xl">🐙</div>
        
        {/* Tentacle animations */}
        <div className="absolute -top-1 -right-1 w-2 h-6 bg-primary/30 rounded-full origin-bottom animate-pulse" 
             style={{ transform: 'rotate(15deg)' }} />
        <div className="absolute -top-2 -left-1 w-2 h-5 bg-primary/30 rounded-full origin-bottom animate-pulse" 
             style={{ transform: 'rotate(-20deg)', animationDelay: '0.5s' }} />
        <div className="absolute -bottom-1 -right-2 w-2 h-4 bg-primary/30 rounded-full origin-top animate-pulse" 
             style={{ transform: 'rotate(45deg)', animationDelay: '1s' }} />
        
        {/* Bubbles */}
        <motion.div
          className="absolute -top-8 -right-2 w-1 h-1 bg-primary/50 rounded-full"
          animate={{
            y: [-20, -40],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0
          }}
        />
        <motion.div
          className="absolute -top-6 right-2 w-1 h-1 bg-primary/50 rounded-full"
          animate={{
            y: [-20, -40],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.7
          }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed glass-panel z-40 overflow-hidden ${
              isFullscreen 
                ? 'inset-4 w-auto h-auto' 
                : 'bottom-24 right-6 w-80 h-96'
            }`}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border/30">
              <div className="flex items-center space-x-2">
                <span className="text-xl">🐙</span>
                <div>
                  <h3 className="font-semibold">Marine AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1 hover:bg-glass-bg/30 rounded-lg transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-glass-bg/30 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-3 ${
              isFullscreen ? 'h-[calc(100vh-12rem)]' : 'h-64'
            }`}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isBot
                        ? 'bg-glass-bg/30 text-foreground'
                        : 'bg-primary/20 text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-glass-border/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about marine data..."
                  className="flex-1 bg-glass-bg/30 border border-glass-border/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotOctopus;