import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Microscope, Send, Loader2, ArrowLeft, Upload, X, Image, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { streamOtolith, type OtolithMessage } from '@/lib/otolithService';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type DisplayMessage = {
  id: number;
  text: string;
  isBot: boolean;
  imageUrl?: string;
};

const WELCOME = "Welcome to **Otolith Morphology Analysis**! 🔬\n\nUpload an otolith image and I'll provide:\n- **Species identification** from shape analysis\n- **Morphometric measurements** (circularity, aspect ratio, form factor)\n- **Age estimation** from growth ring analysis\n- **Shape classification** and margin type\n\nYou can also ask questions about otolith morphology without an image.";

const EXAMPLES = [
  "What are the key morphometric measurements used in otolith analysis?",
  "How do otolith shapes differ between pelagic and demersal fish?",
  "Explain the relationship between otolith size and fish age",
  "What is the sulcus acusticus and why is it important?",
];

const OtolithMorphology = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<DisplayMessage[]>([
    { id: 1, text: WELCOME, isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<OtolithMessage[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image must be less than 10MB');
      return;
    }
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error('Please sign in to upload images');
      return null;
    }
    setIsUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from('otolith-images')
      .upload(path, file);
    setIsUploading(false);
    if (error) {
      toast.error('Failed to upload image');
      return null;
    }
    const { data: urlData } = supabase.storage
      .from('otolith-images')
      .getPublicUrl(path);
    return urlData.publicUrl;
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSend = async (text?: string) => {
    const query = text || input.trim();
    if ((!query && !selectedImage) || isLoading) return;
    setInput('');

    let imageUrl: string | null = null;
    let base64Image: string | null = null;

    if (selectedImage) {
      if (user) {
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl) return;
      } else {
        base64Image = await fileToBase64(selectedImage);
      }
    }

    const displayText = query || 'Analyze this otolith image';
    const userMsg: DisplayMessage = {
      id: nextId.current++,
      text: displayText,
      isBot: false,
      imageUrl: imagePreview || undefined,
    };
    setMessages(prev => [...prev, userMsg]);
    removeImage();

    // Build multimodal message for AI
    let userContent: OtolithMessage['content'];
    if (imageUrl || base64Image) {
      const imgSrc = imageUrl || base64Image!;
      userContent = [
        { type: 'text', text: displayText },
        { type: 'image_url', image_url: { url: imgSrc } },
      ];
    } else {
      userContent = displayText;
    }

    const newHistory: OtolithMessage[] = [...chatHistory, { role: 'user', content: userContent }];
    setChatHistory(newHistory);

    setIsLoading(true);
    const botId = nextId.current++;
    let accumulated = '';

    setMessages(prev => [...prev, { id: botId, text: '', isBot: true }]);
    scrollToBottom();

    await streamOtolith({
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
    removeImage();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Link to="/modules" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Modules
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/5">
                <Microscope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-aqua">Otolith Morphology</h1>
                <p className="text-sm text-muted-foreground">AI-powered otolith shape analysis & age estimation</p>
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
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
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
                  <div className={`max-w-[85%] rounded-lg p-3 ${msg.isBot ? 'bg-muted/50 text-foreground' : 'bg-primary text-primary-foreground'}`}>
                    {msg.imageUrl && (
                      <img
                        src={msg.imageUrl}
                        alt="Otolith"
                        className="max-w-xs max-h-48 rounded-md mb-2 object-contain"
                      />
                    )}
                    {msg.isBot ? (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-table:text-sm prose-th:px-3 prose-th:py-1.5 prose-td:px-3 prose-td:py-1.5 prose-table:border prose-th:border prose-td:border prose-th:bg-muted/30">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                        {msg.text === '' && isLoading && (
                          <span className="inline-flex items-center gap-1 text-muted-foreground">
                            <Loader2 className="w-3 h-3 animate-spin" /> Analyzing otolith...
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

            {/* Examples */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Upload prompt */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-glass-border/50 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all mb-4"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    <span className="text-primary font-medium">Click to upload</span> or drag & drop an otolith image
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {EXAMPLES.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(ex)}
                      className="text-left text-sm p-3 rounded-lg border border-glass-border/30 bg-glass-bg/20 hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-foreground"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="px-4 pt-2">
              <div className="inline-flex items-start gap-2 p-2 bg-muted/30 rounded-lg border border-glass-border/30">
                <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
                <button onClick={removeImage} className="p-1 hover:bg-destructive/20 rounded transition-colors">
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-glass-border/30">
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex gap-2"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="shrink-0"
              >
                <Image className="w-4 h-4" />
              </Button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={selectedImage ? "Add a description (optional)..." : "Ask about otolith morphology or upload an image..."}
                className="flex-1 px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                disabled={isLoading}
              />
              <Button type="submit" disabled={(isLoading || (!input.trim() && !selectedImage)) && !isUploading} size="lg">
                {isLoading || isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OtolithMorphology;
