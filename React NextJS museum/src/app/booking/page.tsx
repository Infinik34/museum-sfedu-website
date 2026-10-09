// app/reservation/page.tsx
'use client';
import type { DateValue } from "@internationalized/date";
import { useState, useEffect } from 'react';
import { Input, TextField, Label, TextArea, Button, Calendar } from "@heroui/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import Link from 'next/link';

export default function ReservationPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);

  const isDateBooked = (date: DateValue) => {
    return bookedDates.includes(date.toString());
  };


  // ЗАКОММЕНТИРОВАНА ЛОГИКА ФОРМЫ ЗАЯВКИ НА ПОСЕЩЕНИЕ МУЗЕЯ

  // const [formData, setFormData] = useState({
  //   name: '',
  //   phone: '',
  //   email: '',
  //   time: '',
  //   comment: '',
  //   consent: false
  // });

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings?fields=date&filters[processed][$eq]=true`);
        const json = await res.json();

        if (json.data) {
          const dates = json.data.map((item: any) => item.date);
          setBookedDates(dates);
        }
      } catch (err) {
        console.error("Ошибка загрузки расписания", err);
      } finally {
        setIsLoadingDates(false);
      }
    };

    fetchBookedDates();
  }, []);


  // const validate = () => {
  //   if (!formData.name.trim()) return 'Введите ваше имя';
  //   if (!formData.phone.trim()) return 'Введите телефон';
  //   if (!selectedDate) return 'Выберите дату в календаре';
  //   if (!formData.time) return 'Выберите время';
  //   if (!formData.consent) return 'Необходимо согласие на обработку данных';
  //   if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     return 'Некорректный email';
  //   }
  //   if (isDateBooked(selectedDate)) return 'Выбранная дата уже занята. Выберите другую.';

  //   return '';
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const validationError = validate();
  //   if (validationError) {
  //     setError(validationError);
  //     return;
  //   }

  //   setError('');
  //   setLoading(true);

  //   try {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bookings`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         data: {
  //           name: formData.name.trim(),
  //           phone: formData.phone.trim(),
  //           email: formData.email.trim() === '' ? null : formData.email.trim(),
  //           date: selectedDate?.toString(),
  //           time: formData.time,
  //           comment: formData.comment.trim(),
  //           consent: formData.consent,
  //           processed: false
  //         }
  //       })
  //     });

  //     if (!res.ok) throw new Error('Ошибка сети');

  //     setStatus('success');
  //     setFormData({ name: '', phone: '', email: '', time: '', comment: '', consent: false });
  //     setSelectedDate(null);
  //   } catch (err) {
  //     console.error(err);
  //     setStatus('error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // if (status === 'success') {
  //   return (
  //     <main className="min-h-screen bg-museum-dark text-white flex items-center justify-center px-4">
  //       <div className="max-w-md text-center space-y-6">
  //         <div className="text-5xl text-teal-400">✓</div>
  //         <h1 className="text-2xl font-bold font-serif">Заявка отправлена</h1>
  //         <p className="text-gray-400">Мы свяжемся с вами в ближайшее время для подтверждения.</p>
  //         <Button
  //           variant="outline"
  //           onPress={() => setStatus('idle')}
  //           className="px-6 py-3 border border-teal-500 text-teal-400 rounded-lg hover:bg-teal-500/10 transition-colors"
  //         >
  //           Новая заявка
  //         </Button>
  //       </div>
  //     </main>
  //   );
  // }

  // const inputClass = "w-full bg-museum-navy/30 border border-gray-700 text-white placeholder:text-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 rounded-lg px-4 py-2.5 transition-all";

  return (
    <main className="min-h-screen bg-museum-dark text-white py-16 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-8">

        <div className="lg:col-span-5 bg-museum-navy/20 p-6 rounded-xl border border-gray-800 h-fit top-24">
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
                  if (date && !isDateBooked(date)) {
                    setSelectedDate(date);
                    setError('');
                  } else if (date) {
                    setError('Эта дата уже занята.');
                  }
                }}
                minValue={today(getLocalTimeZone())}
                className="w-full m-7 text-lg max-w-[400px] m-0!"
                isDateUnavailable={(date) => isDateBooked(date)}
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
                      const isBooked = isDateBooked(date);
                      const isToday = date.compare(today(getLocalTimeZone())) === 0;
                      const isSelected = selectedDate?.compare(date) === 0;

                      return (
                        <Calendar.Cell
                          date={date}>
                          {({ isSelected: cellSelected, isDisabled }) => (
                            <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all
                                ${isBooked
                                ? '!bg-red-500/20 !text-red-400 line-through'
                                : ''}
                                ${isToday && !isBooked && !cellSelected
                                ? 'border border-teal-500/50 text-teal-400 font-bold'
                                : ''}`}>
                              {date.day}
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
                  <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span> Занято
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
            <h1 className="text-3xl font-bold font-serif mb-2">Посещение музея</h1> {/*Запись на экскурсию*/}
            <p className="text-gray-400">
              Выберите свободную дату слева и договоритесь на посещение музея по номеру телефона.
            </p>
            <p className="text-museum-blue text-3xl my-10">+7 (863) 437-14-61</p>
          </header>
          {/*Форма записи в музей*/}
          {/* <form onSubmit={handleSubmit} className="space-y-6 bg-museum-navy/10 p-6 rounded-xl border border-gray-800/50">

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <TextField>
                <Label className="text-sm font-medium text-gray-400">Ваше имя *</Label>
                <Input
                  type="text"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={inputClass}
                />
              </TextField>

              <TextField>
                <Label className="text-sm font-medium text-gray-400">Телефон *</Label>
                <Input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className={inputClass}
                />
              </TextField>
            </div>

            <TextField>
              <Label className="text-sm font-medium text-gray-400">Email (необязательно)</Label>
              <Input
                type="email"
                placeholder="example@mail.ru"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </TextField>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-400">Выбранная дата</label>
                <div className={`w-full h-[46px] flex items-center px-4 rounded-lg border ${selectedDate ? 'border-teal-500/50 bg-teal-500/10 text-teal-400' : 'border-gray-700 bg-museum-navy/30 text-gray-500'}`}>
                  {selectedDate ? selectedDate.toString() : 'Нажмите на календарь слева'}
                </div>
              </div>

              <TextField>
                <Label className="text-sm font-medium text-gray-400">Желаемое время *</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  className={`${inputClass} [color-scheme:dark]`}
                />
              </TextField>
            </div>

            <TextField>
              <Label className="text-sm font-medium text-gray-400">Комментарий / Кол-во человек</Label>
              <TextArea
                placeholder="Например: группа из 5 школьников..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </TextField>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="consent"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 rounded border-gray-600 bg-museum-navy/30 text-teal-500 focus:ring-teal-500/30 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="consent" className="text-sm text-gray-400 cursor-pointer select-none leading-tight">
                Я даю согласие на обработку моих персональных данных (ФИО, телефон, email) в целях записи на экскурсию и подтверждения брони. Ознакомлен с{' '}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-teal-400 hover:text-teal-300 underline decoration-dotted underline-offset-2 transition-colors"
                >
                  политикой конфиденциальности
                </Link>
                {' '}*
              </label>
            </div>

            <Button
              type="submit"
              isDisabled={loading || isLoadingDates}
              className={`w-full h-12 font-medium text-white rounded-lg transition-all shadow-lg shadow-teal-900/20 ${loading ? 'bg-teal-800 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-500 hover:scale-[1.01]'
                }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправка...
                </span>
              ) : (
                'Отправить заявку'
              )}
            </Button>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center mt-2">
                Не удалось отправить. Попробуйте позже или позвоните нам.
              </p>
            )}
          </form> */}
        </div>
      </div>
    </main>
  );
}