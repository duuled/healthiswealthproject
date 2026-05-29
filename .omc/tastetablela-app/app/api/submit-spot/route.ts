import { NextRequest, NextResponse } from 'next/server';

interface SubmitSpotBody {
  name: string;
  neighborhood: string;
  cuisine: string;
  address: string;
  mustOrder: string | string[];
  submitterName: string;
  submitterContact: string;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body)
  ) {
    return NextResponse.json(
      { success: false, message: 'Request body must be a JSON object.' },
      { status: 400 }
    );
  }

  const data = body as Record<string, unknown>;

  // Validate required fields
  const requiredFields: (keyof SubmitSpotBody)[] = [
    'name',
    'neighborhood',
    'cuisine',
    'address',
    'mustOrder',
    'submitterName',
    'submitterContact',
  ];

  for (const field of requiredFields) {
    const value = data[field];
    if (!value) {
      return NextResponse.json(
        {
          success: false,
          message: `Missing required field: ${field}`,
          field,
        },
        { status: 422 }
      );
    }
  }

  // Validate types
  if (!isString(data.name) || data.name.trim().length < 2) {
    return NextResponse.json(
      { success: false, message: 'Spot name must be at least 2 characters.' },
      { status: 422 }
    );
  }

  if (!isString(data.neighborhood)) {
    return NextResponse.json(
      { success: false, message: 'Neighborhood must be a string.' },
      { status: 422 }
    );
  }

  if (!isString(data.cuisine)) {
    return NextResponse.json(
      { success: false, message: 'Cuisine must be a string.' },
      { status: 422 }
    );
  }

  if (!isString(data.address) || data.address.trim().length < 5) {
    return NextResponse.json(
      { success: false, message: 'Address must be at least 5 characters.' },
      { status: 422 }
    );
  }

  if (!isString(data.submitterName) || data.submitterName.trim().length < 2) {
    return NextResponse.json(
      {
        success: false,
        message: 'Submitter name must be at least 2 characters.',
      },
      { status: 422 }
    );
  }

  if (!isString(data.submitterContact)) {
    return NextResponse.json(
      { success: false, message: 'Submitter contact must be a string.' },
      { status: 422 }
    );
  }

  // Normalize mustOrder to array
  let mustOrder: string[];
  if (Array.isArray(data.mustOrder)) {
    mustOrder = data.mustOrder.filter(isString);
  } else if (isString(data.mustOrder)) {
    mustOrder = data.mustOrder
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  } else {
    return NextResponse.json(
      {
        success: false,
        message:
          'mustOrder must be a string or array of strings (comma-separated dishes).',
      },
      { status: 422 }
    );
  }

  if (mustOrder.length === 0) {
    return NextResponse.json(
      { success: false, message: 'At least one must-order dish is required.' },
      { status: 422 }
    );
  }

  // Build submission record
  const submission: SubmitSpotBody & { submittedAt: string } = {
    name: (data.name as string).trim(),
    neighborhood: (data.neighborhood as string).trim(),
    cuisine: (data.cuisine as string).trim(),
    address: (data.address as string).trim(),
    mustOrder,
    submitterName: (data.submitterName as string).trim(),
    submitterContact: (data.submitterContact as string).trim(),
    submittedAt: new Date().toISOString(),
  };

  // TODO: Replace this log with Notion / Airtable API call when integration is ready.
  // Example: await notion.pages.create({ parent: { database_id: NOTION_DB_ID }, properties: { ... } })
  console.log('[TasteTable LA] New spot submission:', JSON.stringify(submission, null, 2));

  return NextResponse.json(
    {
      success: true,
      message:
        "Thanks for putting us on! We review every submission and will reach out if we add your spot. Real spots only — we love it.",
    },
    { status: 201 }
  );
}
