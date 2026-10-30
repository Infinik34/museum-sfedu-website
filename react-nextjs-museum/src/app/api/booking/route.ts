import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { name, email, phone, date, groupSize, consent } = body;
    
    if (!name || !email || !phone || !date || !consent) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля и подтвердите согласие' },
        { status: 400 }
      );
    }

    const strapiRes = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            name,
            email,
            phone,
            date,
            groupSize: Number(groupSize),
            comment: body.comment || '',
            consent: true, // Пользователь уже подтвердил на клиенте
            processed: false,
          },
        }),
      }
    );

    if (!strapiRes.ok) {
      const error = await strapiRes.json();
      console.error('Strapi error:', error);
      return NextResponse.json(
        { error: 'Не удалось оформить заявку. Попробуйте позже.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Заявка отправлена' });
    
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}