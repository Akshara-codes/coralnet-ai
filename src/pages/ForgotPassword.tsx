import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Waves, Mail, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        className="glass-panel p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div className="flex justify-center mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="p-3 rounded-full bg-primary/20 border border-primary/30 aqua-glow">
              <Waves className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
          <motion.h1 className="text-2xl font-bold text-gradient-aqua mb-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            Reset Password
          </motion.h1>
          <motion.p className="text-muted-foreground" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {sent ? 'Check your email for a reset link' : 'Enter your email to receive a reset link'}
          </motion.p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow" placeholder="scientist@cmlre.gov.in" required />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-glow transition-all duration-300 aqua-glow disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </motion.button>
          </form>
        ) : (
          <motion.div className="text-center space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-muted-foreground">We sent a password reset link to <span className="text-primary font-medium">{email}</span>. Click the link in the email to set a new password.</p>
            <button onClick={() => setSent(false)} className="text-primary hover:text-primary-glow transition-colors text-sm">
              Didn't receive it? Try again
            </button>
          </motion.div>
        )}

        <motion.div className="mt-8 text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}>
          <Link to="/login" className="text-primary hover:text-primary-glow transition-colors font-medium inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
