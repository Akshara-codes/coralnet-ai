import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Loader2, Trash2, Fish, Search, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { streamBiodiversity } from '@/lib/biodiversityService';
import { ChatMessage } from '@/lib/chatService';
import { exportChatToPdf } from '@/lib/pdfExport';

type DisplayMessage = { id: number; text: string; isBot: boolean };

const WELCOME = `🌊 Welcome to the **Biodiversity Assessment Module**!\n\nI'm Mira, your marine ecology assistant. I can help you:\n\n- **Calculate diversity indices** (Shannon, Simpson, Margalef, Evenness)\n- **Assess ecosystem health** with structured scoring\n- **Analyze species composition** and trophic balance\n- **Plan conservation strategies** based on survey data\n\nPaste your species abundance data below or ask me about biodiversity metrics!`;

const EXAMPLES = [
  "Calculate Shannon diversity for: Clownfish 45, Damselfish 30, Wrasse 12, Goby 8, Blenny 5",
  "How do I interpret a Simpson's diversity index of 0.85?",
  "Assess coral reef health given declining parrotfish populations",
  "Compare biodiversity metrics for tropical vs temperate reef systems",
];

const BiodiversityAssessment = () => {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 0, text: WELCOME, isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [dataInput, setDataInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (text?: string) => {
    let userText = text || input.trim();

    if (dataInput.trim() && !text) {
      userText = `Species abundance data:\n\`\`\`\n${dataInput.trim()}\n\`\`\`\n${userText ? `\n${userText}` : 'Please analyze this data and calculate diversity indices.'}`;
      setDataInput('');
    }

    if (!userText) return;
    setInput('');
    setLoading(true);

    const userMsg: DisplayMessage = { id: Date.now(), text: userText, isBot: false };
    setMessages(prev => [...prev, userMsg]);

    const newHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: userText }];
    setChatHistory(newHistory);

    let botText = '';
    const botId = Date.now() + 1;
    setMessages(prev => [...prev, { id: botId, text: '', isBot: true }]);

    await streamBiodiversity({
      messages: newHistory,
      onDelta: (delta) => {
        botText += delta;
        setMessages(prev =>
          prev.map(m => (m.id === botId ? { ...m, text: botText } : m))
        );
      },
      onDone: () => {
        setChatHistory(prev => [...prev, { role: 'assistant', content: botText }]);
        setLoading(false);
        // Save analysis result
        import('@/lib/analysisService').then(({ saveAnalysisResult }) => {
          saveAnalysisResult({
            module: 'biodiversity',
            queryText: userText,
            responsePreview: botText,
            summary: `Biodiversity query: ${userText.slice(0, 100)}`,
          });
        });
      },
      onError: (error) => {
        setMessages(prev =>
          prev.map(m => (m.id === botId ? { ...m, text: `❌ ${error}` } : m))
        );
        setLoading(false);
      },
    });
  };

  const handleClear = () => {
    setMessages([{ id: 0, text: WELCOME, isBot: true }]);
    setChatHistory([]);
    setDataInput('');
  };

  return (
    <div className="min-h-screen pt-4 pb-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Link to="/modules">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Fish className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Biodiversity Assessment</h1>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 className="w-4 h-4 mr-1" /> Clear
          </Button>
        </div>

        {/* Messages */}
        <Card className="glass-panel flex-1 overflow-y-auto p-4 mb-4 space-y-4">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.isBot
                      ? 'bg-muted/50 text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {msg.isBot ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-table:text-xs prose-th:px-2 prose-td:px-2">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                      {loading && messages[messages.length - 1]?.id === msg.id && (
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-sm">{msg.text}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </Card>

        {/* Examples */}
        {messages.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {EXAMPLES.map((ex, i) => (
              <Button
                key={i}
                variant="outline"
                className="text-left h-auto py-3 px-4 text-sm justify-start"
                onClick={() => handleSend(ex)}
              >
                <Search className="w-4 h-4 mr-2 shrink-0" />
                <span className="line-clamp-2">{ex}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Data Input */}
        <div className="space-y-2">
          <Textarea
            value={dataInput}
            onChange={e => setDataInput(e.target.value)}
            placeholder="Paste species abundance data here (e.g., Species1: 45, Species2: 30, ...)..."
            className="text-xs min-h-[60px] max-h-[120px] resize-y bg-muted/30 border-dashed"
          />

          {/* Text Input */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about diversity indices, ecosystem health, or conservation..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading && !input.trim() && !dataInput.trim()} size="icon">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BiodiversityAssessment;
