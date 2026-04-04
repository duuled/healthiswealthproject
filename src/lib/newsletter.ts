import { supabase } from '@/integrations/supabase/client';

export type NewsletterSource = 'shop' | 'home' | 'popup' | 'supplements';

export async function subscribeEmail(email: string, source: NewsletterSource): Promise<{ success: boolean; message: string }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email: email.toLowerCase().trim(), source });

  if (error) {
    // Unique violation = already subscribed
    if (error.code === '23505') {
      return { success: true, message: "You're already subscribed — we'll be in touch!" };
    }
    return { success: false, message: 'Something went wrong. Please try again.' };
  }

  return { success: true, message: "You're in! Check your inbox for wellness drops from FlavorCrave." };
}
