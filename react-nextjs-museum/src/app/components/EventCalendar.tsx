'use client';

import type { DateValue } from "@internationalized/date";
import { useState, useEffect } from 'react';
import { Calendar } from "@heroui/react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { getCalendarEvents } from "@/lib/strapiApi";

export default function EventsCalendar() {
    const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<{ date: string; time: string; info: string } | null>(null);
    const [eventsData, setEventsData] = useState<{ date: string; time: string; info: string }[]>([]);

    const getEvent = (date: DateValue) => {
        const dateString = date.toString();
        return eventsData.find(e => e.date === dateString);
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const json = await getCalendarEvents();
                if (json.data) {
                    const formattedData = json.data.map((item) => ({
                        date: item.date,
                        time: item.time || 'Весь день',
                        info: item.info || 'Описание отсутствует',
                    }));
                    setEventsData(formattedData);
                }
            } catch (err) {
                console.error("Ошибка загрузки календаря событий", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (isLoading) {
        return (
            <div className="h-[500px] flex items-center justify-center text-gray-500 animate-pulse text-xl">
                Загрузка событий...
            </div>
        );
    }

    return (
        <>
            <div className="w-full flex justify-center">
                <Calendar
                    aria-label="Календарь событий"
                    value={selectedDate}
                    onChange={(date) => {
                        if (!date) return;
                        const event = getEvent(date);
                        if (event) {
                            setSelectedEvent({ date: event.date, time: event.time, info: event.info });
                        } else {
                            setSelectedDate(date);
                        }
                    }}
                    minValue={today(getLocalTimeZone())}
                    className="text-lg md:text-lg max-w-lg w-full"
                >
                    <Calendar.Header>
                        <Calendar.Heading className="text-xl md:text-2xl" />
                        <Calendar.NavButton slot="previous" className="text-white hover:bg-white/10" />
                        <Calendar.NavButton slot="next" className="text-white hover:bg-white/10" />
                    </Calendar.Header>
                    <Calendar.Grid className="w-full">
                        <Calendar.GridHeader>
                            {(day) => <Calendar.HeaderCell className="text-gray-400 font-normal py-4">{day}</Calendar.HeaderCell>}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                            {(date) => {
                                const event = getEvent(date);
                                const isToday = date.compare(today(getLocalTimeZone())) === 0;
                                let cellClasses = "w-16 h-16 md:w-16 md:h-16 flex items-center justify-center rounded-full transition-all select-none text-lg md:text-lg relative";

                                if (event) {
                                    cellClasses += " !bg-[#FF2A7A]/20 !text-[#FF2A7A] font-bold border border-[#FF2A7A]/50 cursor-pointer shadow-[0_0_15px_rgba(192,38,211,0.3)]";
                                } else if (isToday) {
                                    cellClasses += " border border-teal-500/50 text-teal-400 font-bold";
                                } else {
                                    cellClasses += " hover:bg-gray-800 cursor-pointer text-gray-300";
                                }

                                return (
                                    <Calendar.Cell date={date} className="py-2">
                                        {() => (
                                            <div className={cellClasses}>
                                                {date.day}
                                                {event && (
                                                    <span className="absolute bottom-1 md:bottom-2 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FF2A7A] rounded-full shadow-[0_0_5px_rgba(192,38,211,0.8)]" />
                                                )}
                                            </div>
                                        )}
                                    </Calendar.Cell>
                                );
                            }}
                        </Calendar.GridBody>
                    </Calendar.Grid>
                </Calendar>
            </div>

            {/* Легенда */}
            <div className="mt-12 flex flex-wrap gap-6 text-sm text-gray-400 justify-center">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#FF2A7A]/20 border border-[#FF2A7A]/50"></span>
                    Событие
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-teal-500/50"></span>
                    Сегодня
                </div>
            </div>

            {/* Модалка */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="bg-museum-navy p-8 rounded-xl max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full bg-[#FF2A7A]"></span>
                            <h3 className="text-white text-2xl">Событие</h3>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between border-b border-gray-700/50 pb-2">
                                <span className="text-gray-400">Дата:</span>
                                <span className="text-white font-medium">{selectedEvent.date}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-700/50 pb-2">
                                <span className="text-gray-400">Время:</span>
                                <span className="text-white font-medium">{selectedEvent.time}</span>
                            </div>
                            <div className="pt-2">
                                <span className="text-gray-400 block mb-2">Описание:</span>
                                <p className="text-gray-200 leading-relaxed bg-museum-dark/50 p-4 rounded-lg">
                                    {selectedEvent.info}
                                </p>
                            </div>
                        </div>
                        <button
                            className="w-full bg-[#c42360] hover:bg-[#a81d52] cursor-pointer text-white font-bold py-3 rounded-lg transition-colors duration-300"
                            onClick={() => setSelectedEvent(null)}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}