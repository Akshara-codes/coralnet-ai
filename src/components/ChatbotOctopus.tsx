import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Maximize2, Minimize2 } from 'lucide-react';

const ChatbotOctopus = ({ forceOpen = false }) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🐙 Hello! I'm your marine research assistant. How can I help you explore our ocean data today?",
      isBot: true
    }
  ]);

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

  const handleTrendingClick = (searchText) => {
    setMessage(searchText);
  };

  return (
    <>
      {/* Floating Octopus Button */}
      <div className="fixed bottom-6 right-6 z-[90]">
        <motion.button
          className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 aqua-glow relative flex items-center justify-center shadow-lg"
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
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
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

        {/* Welcome Toast */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              className="absolute bottom-full right-0 mb-4 w-72 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-primary/20 rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <div className="flex items-start space-x-3">
                <div className="text-xl">🐙</div>
                <div className="text-sm text-foreground leading-relaxed">
                  Hello! I'm your marine research assistant. How can I help you explore our ocean data today?
                </div>
              </div>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white/95 dark:bg-gray-900/95 border-r border-b border-primary/20"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ChatGPT-style Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 z-[85] overflow-hidden shadow-2xl ${
              isFullscreen 
                ? 'inset-4 rounded-2xl' 
                : 'bottom-24 right-6 w-96 h-[32rem] rounded-2xl'
            }`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg">🐙</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Marine AI Assistant</h3>
                  <p className="text-xs text-green-500 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                  title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages Section */}
            <div className={`flex-1 overflow-y-auto ${
              isFullscreen ? 'h-[calc(100vh-16rem)]' : 'h-72'
            }`}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className={`flex items-start space-x-3 p-4 ${
                    index % 2 === 0 ? 'bg-gray-50/30 dark:bg-gray-800/30' : 'bg-transparent'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.isBot ? (
                    <>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm">🐙</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">{msg.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1"></div>
                      <div className="max-w-[75%] bg-primary text-primary-foreground p-3 rounded-2xl rounded-br-md">
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm">👤</span>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              {/* Trending Searches Pills */}
              <div className="p-4 pb-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleTrendingClick(search)}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {search.length > 50 ? search.substring(0, 47) + '...' : search}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Input Box */}
              <div className="px-4 pb-4">
                <div className="flex space-x-3 items-end">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about marine data..."
                      className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotOctopus;