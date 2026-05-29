import { NextResponse } from 'next/server';

interface SubscribePayload {
  email: string;
  name?: string;
  source?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (
    typeof body !== 'object' ||
    body === null ||
    !('email' in body) ||
    typeof (body as Record<string, unknown>).email !== 'string'
  ) {
    return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
  }

  const { email, name, source } = body as SubscribePayload;

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
  }

  // TODO: Replace with Klaviyo / Mailchimp integration
  console.log('[subscribe] New subscriber:', { email, name, source, timestamp: new Date().toISOString() });

  return NextResponse.json({ success: true });
}
