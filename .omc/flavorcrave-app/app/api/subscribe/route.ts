import { NextRequest, NextResponse } from 'next/server';

interface SubscribeRequestBody {
  email: string;
  name?: string;
  source?: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest): Promise<NextResponse<SubscribeResponse>> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Type-narrow the parsed body
  if (typeof body !== 'object' || body === null) {
    return NextResponse.json(
      { success: false, message: 'Request body must be a JSON object.' },
      { status: 400 }
    );
  }

  const { email, name, source } = body as Partial<SubscribeRequestBody>;

  // Validate email presence
  if (!email || typeof email !== 'string') {
    return NextResponse.json(
      { success: false, message: 'Email address is required.' },
      { status: 400 }
    );
  }

  // Validate email format
  const trimmedEmail = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json(
      { success: false, message: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  // Validate optional name field
  const trimmedName = typeof name === 'string' ? name.trim() : undefined;
  const trimmedSource = typeof source === 'string' ? source.trim() : 'unknown';

  // Log subscription (placeholder — integrate Klaviyo or Mailchimp here)
  console.log('[subscribe] New subscriber:', {
    email: trimmedEmail,
    name: trimmedName ?? null,
    source: trimmedSource,
    timestamp: new Date().toISOString(),
  });

  /*
   * ─── Klaviyo integration (uncomment when ready) ────────────────────────────
   * const klaviyoApiKey = process.env.KLAVIYO_API_KEY;
   * if (klaviyoApiKey) {
   *   await fetch('https://a.klaviyo.com/api/profiles/', {
   *     method: 'POST',
   *     headers: {
   *       'Authorization': `Klaviyo-API-Key ${klaviyoApiKey}`,
   *       'Content-Type': 'application/json',
   *       'revision': '2024-02-15',
   *     },
   *     body: JSON.stringify({
   *       data: {
   *         type: 'profile',
   *         attributes: {
   *           email: trimmedEmail,
   *           first_name: trimmedName,
   *           properties: { source: trimmedSource },
   *         },
   *       },
   *     }),
   *   });
   * }
   * ─────────────────────────────────────────────────────────────────────────── */

  return NextResponse.json(
    { success: true, message: "You're on the list! Check your inbox for the free ebook." },
    { status: 200 }
  );
}

export async function GET(): Promise<NextResponse<SubscribeResponse>> {
  return NextResponse.json(
    { success: false, message: 'Method not allowed.' },
    { status: 405 }
  );
}
