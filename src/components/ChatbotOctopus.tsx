import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Maximize2, Minimize2, Glasses } from 'lucide-react';
import mermaidDefault from '@/assets/mermaid-default.png';
import mermaidPrivate from '@/assets/mermaid-private.png';

const ChatbotOctopus = ({ forceOpen = false }) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your marine research assistant. How can I help you explore our ocean data today?",
      isBot: true
    }
  ]);

  const privateMessages = [
    {
      id: 1,
      text: "Hey, I am your Marine Assistant. Welcome to the Private Research Mode! Here you can research freely, we don't save your data.",
      isBot: true
    }
  ];

  const trendingSearches = [
    "How do ocean parameters affect fish distribution patterns?",
    "How can I correlate water quality with marine biodiversity changes?",
    "How is ocean warming affecting marine ecosystems in the Indian Ocean?",
    "How do tidal forces influence coastal ecosystems?"
  ];

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  useEffect(() => {
    // Show tooltip after component mounts
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    // Listen for global chatbot open events
    const handleOpenChatbot = () => {
      setIsOpen(true);
      setShowTooltip(false);
    };

    window.addEventListener('openChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openChatbot', handleOpenChatbot);
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      isBot: false
    };

    const currentMessages = isPrivateMode ? privateMessages : messages;
    const setCurrentMessages = isPrivateMode ? 
      (updater) => { /* Private mode doesn't save data */ } : 
      setMessages;

    if (!isPrivateMode) {
      setMessages(prev => [...prev, newMessage]);
    }
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: isPrivateMode 
          ? "I'm processing your private marine data query. Your data is not being saved in this mode."
          : "I'm processing your marine data query. This feature will provide AI-powered insights about biodiversity patterns, species correlations, and ecosystem health metrics.",
        isBot: true
      };
      if (!isPrivateMode) {
        setMessages(prev => [...prev, botResponse]);
      }
    }, 1000);
  };

  const handleTrendingClick = (searchText) => {
    setMessage(searchText);
  };

  const togglePrivateMode = () => {
    setIsPrivateMode(!isPrivateMode);
  };

  return (
    <>
      {/* Floating Octopus Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className="p-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 aqua-glow relative"
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
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
        <img 
          src={isPrivateMode ? mermaidPrivate : mermaidDefault} 
          alt="Marine Assistant" 
          className="w-8 h-8 object-contain"
        />
        
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

        {/* Notification Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-glass-panel border border-primary/30 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm text-foreground">
                Hello! I'm your marine research assistant. How can I help you explore our ocean data today?
              </div>
              <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-glass-panel border-r border-b border-primary/30"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed glass-panel z-[45] flex flex-col ${
              isFullscreen 
                ? 'inset-4 w-auto h-auto' 
                : 'bottom-24 right-6 w-96 h-[600px]'
            } ${isPrivateMode ? 'dark bg-slate-900/90 border-slate-700/50' : ''}`}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b flex-shrink-0 ${
              isPrivateMode ? 'border-slate-700/50 bg-slate-800/50' : 'border-glass-border/30'
            }`}>
              <div className="flex items-center space-x-2">
                <img 
                  src={isPrivateMode ? mermaidPrivate : mermaidDefault} 
                  alt="Marine Assistant" 
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <h3 className={`font-semibold ${isPrivateMode ? 'text-white' : ''}`}>
                    Marine AI Assistant
                  </h3>
                  <p className={`text-xs ${isPrivateMode ? 'text-slate-400' : 'text-muted-foreground'}`}>
                    {isPrivateMode ? 'Private Mode' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePrivateMode}
                  className={`p-1 rounded-lg transition-colors ${
                    isPrivateMode 
                      ? 'bg-slate-700/50 hover:bg-slate-600/50 text-white' 
                      : 'hover:bg-glass-bg/30'
                  }`}
                  title={isPrivateMode ? "Exit private mode" : "Enter private mode"}
                >
                  <Glasses className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`p-1 rounded-lg transition-colors ${
                    isPrivateMode 
                      ? 'hover:bg-slate-600/50 text-white' 
                      : 'hover:bg-glass-bg/30'
                  }`}
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
                  className={`p-1 rounded-lg transition-colors ${
                    isPrivateMode 
                      ? 'hover:bg-slate-600/50 text-white' 
                      : 'hover:bg-glass-bg/30'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages - Scrollable like ChatGPT */}
            <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 ${
              isPrivateMode ? 'bg-slate-800/30' : ''
            }`}>
              {(isPrivateMode ? privateMessages : messages).map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.isBot && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isPrivateMode ? 'bg-slate-700' : 'bg-primary/20'
                    }`}>
                      <img 
                        src={isPrivateMode ? mermaidPrivate : mermaidDefault} 
                        alt="Marine Assistant" 
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.isBot
                        ? isPrivateMode 
                          ? 'bg-slate-700/50 text-white'
                          : 'bg-muted/50 text-foreground'
                        : isPrivateMode
                          ? 'bg-slate-600 text-white ml-auto'
                          : 'bg-primary text-primary-foreground ml-auto'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  {!msg.isBot && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isPrivateMode ? 'bg-slate-600' : 'bg-primary'
                    }`}>
                      <span className={`text-sm ${isPrivateMode ? 'text-white' : 'text-primary-foreground'}`}>U</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Trending Searches & Input - Sticky at bottom */}
            <div className={`border-t p-4 flex-shrink-0 ${
              isPrivateMode ? 'border-slate-700/50 bg-slate-800/50' : 'border-glass-border/30'
            }`}>
              {/* Trending Pills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleTrendingClick(search)}
                      className={`px-3 py-1 text-xs rounded-full transition-all duration-200 text-left ${
                        isPrivateMode 
                          ? 'bg-slate-700/50 border border-slate-600/50 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500/50'
                          : 'bg-muted/30 border border-border/30 hover:bg-primary/10 hover:border-primary/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {search.length > 50 ? search.substring(0, 50) + '...' : search}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isPrivateMode ? "Ask privately about marine data..." : "Ask about marine data..."}
                  className={`flex-1 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 ${
                    isPrivateMode 
                      ? 'bg-slate-700/50 border border-slate-600/50 text-white placeholder-slate-400'
                      : 'bg-muted/30 border border-border/30'
                  }`}
                />
                <button
                  onClick={handleSendMessage}
                  className={`px-4 py-3 rounded-lg transition-colors disabled:opacity-50 ${
                    isPrivateMode 
                      ? 'bg-slate-600 text-white hover:bg-slate-500'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                  disabled={!message.trim()}
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