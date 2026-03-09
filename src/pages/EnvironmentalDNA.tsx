import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Send, Loader2, Trash2, Dna, FlaskConical, Search, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { streamEdna } from '@/lib/ednaService';
import { ChatMessage } from '@/lib/chatService';
import { exportChatToPdf } from '@/lib/pdfExport';

type DisplayMessage = { id: number; text: string; isBot: boolean };

const WELCOME = `🧬 Welcome to the **Environmental DNA (eDNA) Analysis Module**!\n\nI'm Mira, your molecular biology assistant. I can help you:\n\n- **Analyze DNA/RNA sequences** for species identification\n- **Match sequences** against reference databases (GenBank, BOLD)\n- **Assess biodiversity** from metabarcoding data\n- **Design sampling protocols** and primer strategies\n\nPaste a sequence below or ask me about eDNA methodology!`;

const EXAMPLES = [
  "Analyze this COI barcode: ATGACTGATCTTTTGGACACCCAGAAGTTTAC",
  "What primers should I use for marine fish eDNA?",
  "Explain the 12S rRNA marker for aquatic biodiversity",
  "How do I assess water quality using eDNA metabarcoding?",
];

const EnvironmentalDNA = () => {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 0, text: WELCOME, isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [sequenceInput, setSequenceInput] = useState('');
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
    
    // If there's a sequence in the sequence input, prepend it
    if (sequenceInput.trim() && !text) {
      userText = `Analyze this sequence:\n\`\`\`\n${sequenceInput.trim()}\n\`\`\`\n${userText ? `\n${userText}` : ''}`;
      setSequenceInput('');
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

    await streamEdna({
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
            module: 'edna',
            queryText: userText,
            responsePreview: botText,
            summary: `eDNA query: ${userText.slice(0, 100)}`,
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
    setSequenceInput('');
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
              <Dna className="w-6 h-6 text-primary" />
              <h1 className="text-xl font-bold">Environmental DNA Analysis</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => exportChatToPdf({ title: 'Environmental DNA Analysis', messages: messages.map(m => ({ text: m.text, isBot: m.isBot })) })} disabled={messages.length <= 1}>
              <Download className="w-4 h-4 mr-1" /> Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-1" /> Clear
            </Button>
          </div>
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

        {/* Sequence Input */}
        <div className="space-y-2">
          {sequenceInput !== null && (
            <div className="relative">
              <Textarea
                value={sequenceInput}
                onChange={e => setSequenceInput(e.target.value)}
                placeholder="Paste DNA/RNA sequence here (e.g., ATCGATCG...)..."
                className="font-mono text-xs min-h-[60px] max-h-[120px] resize-y bg-muted/30 border-dashed"
              />
              {sequenceInput && (
                <div className="absolute top-1 right-1">
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                    {sequenceInput.replace(/\s/g, '').length} bp
                  </span>
                </div>
              )}
            </div>
          )}

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
              placeholder="Ask about eDNA analysis, primers, or methodology..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading && !input.trim() && !sequenceInput.trim()} size="icon">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalDNA;
