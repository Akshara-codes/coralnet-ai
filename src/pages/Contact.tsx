import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Globe, MapPin, Mail, Phone, Clock } from 'lucide-react';
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
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-aqua">
            Contact Our Research Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with our marine biodiversity experts for collaborations, technical support, or research inquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Send Us a Message */}
          <motion.div
            className="glass-panel p-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
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

          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  className="glass-panel p-6 hover:bg-glass-bg/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-primary/20 text-primary flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Location */}
            <motion.div
              className="glass-panel p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-lg bg-secondary/20 text-secondary">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Research Center Location
                </h3>
              </div>
              <div className="bg-glass-bg/20 rounded-lg h-36 flex items-center justify-center border border-glass-border/30">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">CMLRE Campus, Kochi, Kerala</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
