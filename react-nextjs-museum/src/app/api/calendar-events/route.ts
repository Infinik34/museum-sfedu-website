import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

    if (!strapiUrl) {
      return NextResponse.json(
        { error: 'STRAPI_URL is not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${strapiUrl}/api/kalendar-sobytijs?fields=date%2Ctime%2Cinfo&sort=date%3Aasc`,
      { cache: 'no-store' }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch events from Strapi' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Calendar API error:', error);

    return NextResponse.json(
      { error: 'Failed to load calendar events' },
      { status: 502 }
    );
  }
}