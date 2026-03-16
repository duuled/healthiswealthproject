import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContact } from '@/hooks/useContact';
import { useAuth } from '@/hooks/useAuth';

export function Contact() {
  const { profile, user } = useAuth();
  const { sendMessage, isSubmitting } = useContact();

  const [name, setName] = useState(profile?.full_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await sendMessage({ name, email, subject, message });
    if (ok) {
      setSent(true);
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16" id="contact">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-widest uppercase mb-4">
            <Mail className="w-4 h-4" />
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide mb-4">Contact Us</h1>
          <p className="text-muted-foreground">
            Have a question about our products or your order? We're here to help.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Message Sent!</h2>
            <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
            <Button variant="outline" onClick={() => setSent(false)}>Send Another</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Name *</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email *</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-subject">Subject</Label>
              <Input
                id="contact-subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Order question, product inquiry…"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message *</Label>
              <Textarea
                id="contact-message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell us how we can help…"
                rows={6}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Sending…' : 'Send Message'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
