import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Send, Loader2, ArrowLeft, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { streamTaxonomy } from '@/lib/taxonomyService';
import type { ChatMessage } from '@/lib/chatService';

type DisplayMessage = {
  id: number;
  text: string;
  isBot: boolean;
};

const WELCOME = "Welcome to the **Taxonomy Explorer**! 🌊\n\nDescribe a marine species and I'll identify it with full classification, habitat info, and similar species. Try:\n- *\"Blue fish with yellow stripes, found in coral reefs\"*\n- *\"What family does the bluefin tuna belong to?\"*\n- *\"Compare hammerhead shark species\"*";

const EXAMPLES = [
  "Identify a large flat fish with both eyes on one side, found on sandy ocean floors",
  "What is the full taxonomy of the giant Pacific octopus?",
  "Small colorful fish with a symbiotic relationship with sea anemones",
  "Compare the classification of dolphins and porpoises",
];

const TaxonomyExplorer = () => {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 1, text: WELCOME, isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  const handleSend = async (text?: string) => {
    const query = text || input.trim();
    if (!query || isLoading) return;
    setInput('');

    const userMsg: DisplayMessage = { id: nextId.current++, text: query, isBot: false };
    setMessages(prev => [...prev, userMsg]);

    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: query }];
    setChatHistory(newHistory);

    setIsLoading(true);
    const botId = nextId.current++;
    let accumulated = '';

    setMessages(prev => [...prev, { id: botId, text: '', isBot: true }]);
    scrollToBottom();

    await streamTaxonomy({
      messages: newHistory,
      onDelta: (delta) => {
        accumulated += delta;
        setMessages(prev =>
          prev.map(m => (m.id === botId ? { ...m, text: accumulated } : m))
        );
        scrollToBottom();
      },
      onDone: () => {
        setChatHistory(prev => [...prev, { role: 'assistant', content: accumulated }]);
        setIsLoading(false);
        scrollToBottom();
        // Save analysis result
        import('@/lib/analysisService').then(({ saveAnalysisResult }) => {
          saveAnalysisResult({
            module: 'taxonomy',
            queryText: query,
            responsePreview: accumulated,
            summary: `Taxonomy query: ${query.slice(0, 100)}`,
          });
        });
      },
      onError: (error) => {
        setMessages(prev =>
          prev.map(m => (m.id === botId ? { ...m, text: `⚠️ ${error}` } : m))
        );
        setIsLoading(false);
      },
    });
  };

  const handleClear = () => {
    setMessages([{ id: 1, text: WELCOME, isBot: true }]);
    setChatHistory([]);
    nextId.current = 2;
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link to="/modules" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Modules
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
                <TreePine className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-aqua">Taxonomy Explorer</h1>
                <p className="text-sm text-muted-foreground">AI-powered species identification & classification</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
        </motion.div>

        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel flex flex-col"
          style={{ height: 'calc(100vh - 260px)' }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      msg.isBot
                        ? 'bg-muted/50 text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    {msg.isBot ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-table:text-sm prose-th:px-3 prose-th:py-1.5 prose-td:px-3 prose-td:py-1.5 prose-table:border prose-th:border prose-td:border prose-th:bg-muted/30">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                        {msg.text === '' && isLoading && (
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Loader2 className="w-3 h-3 animate-spin" /> Analyzing...
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm">{msg.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Example prompts - show only when just welcome message */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4"
              >
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(ex)}
                    className="text-left text-sm p-3 rounded-lg border border-glass-border/30 bg-glass-bg/20 hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
                  >
                    <Search className="w-3 h-3 inline mr-2 text-primary" />
                    {ex}
                  </button>
                ))}
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-glass-border/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe a species or ask a taxonomy question..."
                className="flex-1 px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} size="lg">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaxonomyExplorer;
