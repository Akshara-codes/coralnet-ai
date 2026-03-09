import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const CONTACT_EMAIL = 'akshara.studyjams@gmail.com';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be under 255 characters'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be under 1000 characters'),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.issues[0]?.message || 'Please check your inputs.');
      return;
    }

    setSending(true);

    const cleanData = validation.data;
    const subject = encodeURIComponent(`Contact message from ${cleanData.name}`);
    const body = encodeURIComponent(
      `Name: ${cleanData.name}\nEmail: ${cleanData.email}\n\nMessage:\n${cleanData.message}`,
    );

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
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow text-foreground"
                placeholder="Your full name"
                required
                maxLength={100}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow text-foreground"
                placeholder="your.email@example.com"
                required
                maxLength={255}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                Message
              </label>
              <textarea
                id="message"
                rows={8}
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow resize-none text-foreground"
                placeholder="Tell us about your research interests, collaboration ideas, or technical questions..."
                required
                maxLength={1000}
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending || !formData.message.trim() || !formData.name.trim() || !formData.email.trim()}
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
