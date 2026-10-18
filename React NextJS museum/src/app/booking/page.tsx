// app/reservation/page.tsx
'use client';
import type { DateValue } from "@internationalized/date";
import { useState, useEffect } from 'react';
import { Calendar } from "@heroui/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

export default function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [selectedBookingInfo, setSelectedBookingInfo] = useState<{ date: string, time: string } | null>(null);

  const [bookedData, setBookedData] = useState<{
    date: string;
    isFullDay: boolean;
    time?: string;
  }[]>([]);

  const getBookingStatus = (date: DateValue) => {
    const dateString = date.toString();
    const booking = bookedData.find(b => b.date === dateString);

    if (!booking) return { status: 'free' as const };
    if (booking.isFullDay) return { status: 'blocked' as const, reason: 'Музей закрыт весь день' };

    return { status: 'partial' as const, time: booking.time || 'Не указано' };
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const dateFromStr = new Date().toISOString().split('T')[0];
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings?fields=date,time,isFullDay&filters[date][$gte]=${dateFromStr}&sort=date:asc`
        );
        if (!res.ok) throw new Error('Failed to fetch schedule');
        const json = await res.json();

        if (json.data) {
          const formattedData = json.data.map((item: any) => ({
            date: item.date,
            isFullDay: !!item.isFullDay,
            time: item.time,
          }));
          setBookedData(formattedData);
        }
      } catch (err) {
        console.error("Ошибка загрузки расписания", err);
      } finally {
        setIsLoadingDates(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <main className="min-h-screen bg-museum-dark text-white py-16 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-5 max-w-[450px] bg-museum-navy/20 p-6 rounded-xl border border-gray-800 h-fit top-24">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Выбор даты
          </h2>

          {isLoadingDates ? (
            <div className="h-[300px] flex items-center justify-center text-gray-500 animate-pulse">
              Загрузка расписания...
            </div>
          ) : (
            <>
              <Calendar
                aria-label="Календарь бронирования"
                value={selectedDate}
                onChange={(date) => {
                  if (!date) return;
                  const { status, time } = getBookingStatus(date);
                  
                  if (status === 'blocked') return; // Не даём выбрать закрытые дни

                  if (status === 'partial') {
                    // Открываем модалку вместо выбора даты
                    setSelectedBookingInfo({
                      date: date.toString(),
                      time: time || 'Не указано'
                    });
                  } else {
                    setSelectedDate(date);
                  }
                }}
                isDateUnavailable={(date) => getBookingStatus(date).status === 'blocked'}
                minValue={today(getLocalTimeZone())}
                className="w-full text-lg max-w-[400px]"
              >
                <Calendar.Header>
                  <Calendar.Heading />
                  <Calendar.NavButton slot="previous" />
                  <Calendar.NavButton slot="next" />
                </Calendar.Header>
                <Calendar.Grid>
                  <Calendar.GridHeader>
                    {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                  </Calendar.GridHeader>
                  <Calendar.GridBody>
                    {(date) => {
                      const { status, time } = getBookingStatus(date);
                      const isToday = date.compare(today(getLocalTimeZone())) === 0;

                      let cellClasses = "";
                      let isBlockedVisual = false;
                      let dotClass = "";

                      if (status === 'blocked') {
                        cellClasses = "!bg-red-500/20 !text-red-400 line-through opacity-60";
                        isBlockedVisual = true;
                      } else if (status === 'partial') {
                        cellClasses = "border border-yellow-500/50 text-yellow-400 font-medium relative";
                        dotClass = "absolute bg-yellow-500 rounded-full";
                      } else if (isToday) {
                        cellClasses = "border border-teal-500/50 text-teal-400 font-bold";
                      }

                      return (
                        <Calendar.Cell date={date}>
                          {() => (
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all select-none
                              ${cellClasses} 
                              ${isBlockedVisual ? 'pointer-events-none cursor-not-allowed' : ''}
                              group relative
                            `}>
                              {date.day}
                              
                              {/* Точка для мобильных */}
                              {status === 'partial' && <span className={dotClass} />}

                              {/* Тултип для ПК (при наведении) */}
                              {status === 'partial' && (
                                <div className="absolute z-50 hidden md:group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none top-full mt-1 left-1/2 -translate-x-1/2">
                                  {time || '—'}
                                </div>
                              )}
                            </div>
                          )}
                        </Calendar.Cell>
                      );
                    }}
                  </Calendar.GridBody>
                </Calendar.Grid>
              </Calendar>

              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-400 justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50 line-through"></span>Закрыто весь день
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border bg-yellow-500/20 border-yellow-500/50 relative"></span>Частично занято
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-teal-500/50"></span> Сегодня
                </div>
              </div>
            </>
          )}
        </div>

        <div className="lg:col-span-7">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Посещение музея</h1>
            <p className="text-gray-400">
              Выберите свободную дату слева и договоритесь на посещение музея по номеру телефона.
            </p>
            <p className="text-museum-blue pt-5 text-4xl">+7 (863) 437-14-61</p>
          </header>
        </div>
      </div>

      {/* Модальное окно для мобильных */}
      {selectedBookingInfo && (
        <div 
          className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedBookingInfo(null)}
        >
          <div 
            className="bg-museum-navy border border-gray-700 p-6 rounded-xl max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-xl font-bold mb-4">Информация о занятости</h3>
            <div className="space-y-2 mb-6 text-gray-300">
              <p>Дата: <span className="text-white font-medium">{selectedBookingInfo.date}</span></p>
              <p>Время: <span className="text-yellow-400 font-medium">{selectedBookingInfo.time}</span></p>
            </div>
            <button 
              className="w-full bg-museum-blue text-white py-2 rounded-lg hover:bg-museum-blue/80 transition-colors"
              onClick={() => setSelectedBookingInfo(null)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </main>
  );
}