import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useNewsletter() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscribe = async (email: string, source: string = 'website') => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert({ email, source, is_active: true }, { onConflict: 'email' });

      if (error) throw error;

      toast.success('You\'re subscribed! Thank you for joining the Health Is Wealth community.');
      return true;
    } catch (err: any) {
      toast.error('Something went wrong. Please try again.');
      console.error('Newsletter subscribe error:', err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { subscribe, isSubmitting };
}
