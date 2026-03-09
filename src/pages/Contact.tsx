import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

const CONTACT_EMAIL = 'akshara.studyjams@gmail.com';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    const subject = encodeURIComponent('Message from Marine Biodiversity Platform');
    const body = encodeURIComponent(message);
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    toast.success('Email client opened! Send your message from there.');
    setSending(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-aqua">
            Contact Our Research Team
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Connect with our marine biodiversity experts for collaborations, technical support, or research inquiries.
          </p>
        </motion.div>

        {/* Send Us a Message */}
        <motion.div
          className="glass-panel p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2 text-gradient-aqua">
            Send Us a Message
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your message will be sent to <span className="text-primary">{CONTACT_EMAIL}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow resize-none text-foreground"
                placeholder="Tell us about your research interests, collaboration ideas, or technical questions..."
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending || !message.trim()}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary-glow transition-all duration-300 aqua-glow flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
