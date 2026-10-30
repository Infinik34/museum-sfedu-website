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

const queryString = new URLSearchParams({
  fields: 'date,time,isFullDay',
  sort: 'date:asc',
}).toString();

const response = await fetch(
  `${strapiUrl}/api/bookings?${queryString}`,
  { cache: 'no-store' }
);

if (!response.ok) {
  return NextResponse.json(
    { error: 'Failed to fetch bookings from Strapi' },
    { status: response.status }
  );
}

const result = await response.json();

const now = new Date();
const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

const formattedData = result.data.map((item: any) => {
  let formattedDate = item.date;

  if (formattedDate && formattedDate.includes('/')) {
    const [month, day, year] = formattedDate.split('/');
    formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  return {
    ...item,
    date: formattedDate,
  };
});

const filteredData = formattedData.filter(
  (item: any) => item.date >= todayStr
);

return NextResponse.json({ ...result, data: filteredData });

} catch (error) {
console.error('Bookings API error:', error);

return NextResponse.json(
  { error: 'Failed to load bookings' },
  { status: 502 }
);

}
}