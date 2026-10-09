'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RangeCalendar, Button, Popover } from '@heroui/react';
import { useState } from 'react';
import { getLocalTimeZone, parseAbsolute, today, type DateValue } from '@internationalized/date';

export default function NewsDateFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Начальное значение: берем из URL или ставим "сегодня"
    const [value, setValue] = useState<{ start: DateValue; end: DateValue } | null>(() => {
        const from = searchParams.get('from');
        const to = searchParams.get('to');

        if (from && to) {
            try {
                // parseAbsolute требует второй аргумент — таймзону
                return {
                    start: parseAbsolute(from, getLocalTimeZone()),
                    end: parseAbsolute(to, getLocalTimeZone()),
                };
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
            const start = `${value.start.toString()}T00:00:00.000Z`;
            const end = `${value.end.toString()}T23:59:59.999Z`;
            params.set('from', start);
            params.set('to', end);
        } else {
            params.delete('from');
            params.delete('to');
        }
        params.set('page', '1');
        router.push(`/news?${params.toString()}`);
    };

    const clearFilter = () => {
        setValue(null);
        const params = new URLSearchParams(searchParams.toString());
        params.delete('from');
        params.delete('to');
        params.set('page', '1');
        router.push(`/news?${params.toString()}`);
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

        // Сравниваем СЫРЫЕ строки без времени — они обе будут '2026-10-09'
        const fromDay = from.split('T')[0];
        const toDay = to.split('T')[0];

        if (fromDay === toDay) {
            return `За ${formatDate(parseAbsolute(from, getLocalTimeZone()))}`;
        }

        return `За период с ${formatDate(parseAbsolute(from, getLocalTimeZone()))} по ${formatDate(parseAbsolute(to, getLocalTimeZone()))}`;
    };

    return (
        
        <div className="relative">
        <Popover>
            <Popover.Trigger>
                <button className="inline-block bg-museum-navy/60 hover:bg-teal-500/20 text-teal-400 border border-teal-500/40 hover:border-teal-400 px-6 py-3 rounded-lg mt-8 cursor-pointer transition-all duration-300">За период</button>
            </Popover.Trigger>
            <span className="text-sm text-gray-400">{getLabel()}</span>
            <Popover.Content placement="bottom"> 
                <Popover.Dialog className="p-4 bg-museum-navy border border-gray-800 rounded-xl">
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
        </div>
    );
}