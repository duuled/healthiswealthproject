import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function useContact() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendMessage = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        ...data,
        user_id: user?.id ?? null,
      });

      if (error) throw error;

      toast.success('Message sent! We\'ll get back to you within 24 hours.');
      return true;
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { sendMessage, isSubmitting };
}
