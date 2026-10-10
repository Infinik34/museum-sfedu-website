'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RangeCalendar, Button, Popover } from '@heroui/react';
import { useState } from 'react';
import { getLocalTimeZone, parseAbsolute, parseDate, today, type DateValue } from '@internationalized/date';

export default function NewsDateFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);


    // Начальное значение: берем из URL или ставим "сегодня"
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (from && to) {
            try {
                // Если есть 'T' — пришло время → parseAbsolute
                // Если нет — чистая дата → parseDate
                const start = from.includes('T')
                    ? parseAbsolute(from, getLocalTimeZone())
                    : parseDate(from);
                const end = to.includes('T')
                    ? parseAbsolute(to, getLocalTimeZone())
                    : parseDate(to);

                return { start, end };
            } catch (e) {
                console.error('Ошибка парсинга дат:', e);
                return null;
            }
        }
        return null;
    });
    const applyFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            // start — начало дня, end — конец дня тк страпи фильтрует по времени, а не только по дате
            params.set('from', value.start.toString()); // '2026-10-08'
            params.set('to', value.end.toString());     // '2026-10-09'
        } else {
            params.delete('from');
            params.delete('to');
        }
        params.set('page', '1');
        router.push(`/news?${params.toString()}`);
        setIsOpen(false);
    };

    const clearFilter = () => {
        setValue(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('from');
        params.delete('to');
        params.set('page', '1');
        router.push(`/news?${params.toString()}`);
        setIsOpen(false);
    };

    const formatDate = (date: DateValue) => {
        return date.toDate('UTC').toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const getLabel = () => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (!from || !to) return 'За все время';

        if (from === to) return `За ${formatDate(parseDate(from))}`;
        return `За период с ${formatDate(parseDate(from))} по ${formatDate(parseDate(to))}`;
    };

    return (

        <div className="relative">
            <Popover isOpen={isOpen}
                onOpenChange={setIsOpen}>
                <Popover.Trigger className="mt-5">
                    <button type="button" className="inline-block w-60 bg-museum-navy/60 hover:bg-teal-500/20 text-teal-400 border border-teal-500/40 hover:border-teal-400 px-6 py-3 rounded-lg  cursor-pointer transition-all duration-300">Выберите период</button>
                </Popover.Trigger>
                { }
                <Popover.Content placement="bottom">
                    <Popover.Dialog className="p-4 overscroll-contain bg-museum-navy border border-gray-800 rounded-xl">
                        <RangeCalendar
                            
                            aria-label="Выбор периода новостей"
                            value={value}
                            onChange={setValue}
                            className="mb-4 w-full max-w-xs [--calendar-day-size:2.25rem]"
                            maxValue={today(getLocalTimeZone())}
                        >
                            <RangeCalendar.Header>
                                <RangeCalendar.NavButton slot="previous" />
                                <RangeCalendar.Heading />
                                <RangeCalendar.NavButton slot="next" />
                            </RangeCalendar.Header>
                            <RangeCalendar.Grid>
                                <RangeCalendar.GridHeader>
                                    {(day) => <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>}
                                </RangeCalendar.GridHeader>
                                <RangeCalendar.GridBody>
                                    {(date) => <RangeCalendar.Cell date={date} />}
                                </RangeCalendar.GridBody>

                            </RangeCalendar.Grid>

                        </RangeCalendar>

                        <div className="flex gap-2 mt-4">
                            <Button variant="primary" onPress={applyFilter} isDisabled={!value}>
                                Применить
                            </Button>
                            <Button variant="danger-soft" onPress={clearFilter} isDisabled={!value} >
                                Сбросить
                            </Button>
                        </div>
                    </Popover.Dialog>
                </Popover.Content>

            </Popover >
            <p className="text-md pt-5 text-gray-400">{getLabel()}</p>
        </div>
    );
}