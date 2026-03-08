import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Waves, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a recovery session from the URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get('type');
    if (type === 'recovery') {
      setIsValidSession(true);
    }

    // Also listen for auth state changes (recovery event)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsValidSession(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
      navigate('/');
    }
  };

  if (!isValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          className="glass-panel p-8 w-full max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Waves className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Invalid Reset Link</h1>
          <p className="text-muted-foreground mb-4">This password reset link is invalid or has expired.</p>
          <button onClick={() => navigate('/forgot-password')} className="text-primary hover:text-primary-glow transition-colors font-medium">
            Request a new reset link
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        className="glass-panel p-8 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/20 border border-primary/30 aqua-glow">
              <Waves className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gradient-aqua mb-2">Set New Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow" placeholder="Enter new password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" /> : <Eye className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-foreground">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <input type={showPassword ? 'text' : 'password'} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-glass-bg/30 border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 aqua-glow" placeholder="Confirm new password" required />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-glow transition-all duration-300 aqua-glow disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
