"use client";

import { DatePicker, DateField, Calendar } from '@heroui/react';
import { CalendarDays } from 'lucide-react';

const GROUP_CLASS =
    'w-full rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-main)] text-sm transition-all hover:border-[var(--primary)]/50 focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20';

interface DatePickerFieldProps {
    label: string;
}

export function DatePickerField({ label }: DatePickerFieldProps) {
    return (
        <DatePicker aria-label={label} className="w-full" name={label}>
            <DateField.Group fullWidth className={GROUP_CLASS}>
                <DateField.Input className="px-3 text-sm outline-none bg-transparent">
                    {(segment) => (
                        <DateField.Segment
                            segment={segment}
                            className="rounded px-0.5 text-(--text-main) focus:bg-(--primary) focus:text-white outline-none caret-transparent"
                        />
                    )}
                </DateField.Input>
                <DateField.Suffix className="pr-2 flex items-center">
                    <DatePicker.Trigger className="h-7 w-7 rounded-lg flex items-center justify-center text-(--text-secondary) hover:bg-(--primary)/10 hover:text-(--primary) transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--primary)">
                        <DatePicker.TriggerIndicator>
                            <CalendarDays className="w-4 h-4 text-(--text-main)" />
                        </DatePicker.TriggerIndicator>
                    </DatePicker.Trigger>
                </DateField.Suffix>
            </DateField.Group>

            <DatePicker.Popover
                placement="bottom start"
                className="z-50 rounded-2xl bg-surface border border-border shadow-2xl shadow-black/15 overflow-hidden"
            >
                <Calendar aria-label={label}>
                    <Calendar.Header className="flex items-center justify-between">
                        <Calendar.YearPickerTrigger className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-(--primary)/10 transition-colors outline-none">
                            <Calendar.YearPickerTriggerHeading className="text-xs font-semibold text-(--text-main)" />
                            <Calendar.YearPickerTriggerIndicator className="text-(--text-secondary)" />
                        </Calendar.YearPickerTrigger>
                        <div className="flex items-center gap-1">
                            <Calendar.NavButton
                                slot="previous"
                                className="rounded-lg flex items-center justify-center text-(--text-secondary) hover:bg-(--primary)/10 hover:text-(--primary) transition-colors outline-none"
                            />
                            <Calendar.NavButton
                                slot="next"
                                className="rounded-lg flex items-center justify-center text-(--text-secondary) hover:bg-(--primary)/10 hover:text-(--primary) transition-colors outline-none"
                            />
                        </div>
                    </Calendar.Header>

                    <Calendar.Grid>
                        <Calendar.GridHeader>
                            {(day) => (
                                <Calendar.HeaderCell className="text-xs font-semibold text-(--text-secondary) text-center">
                                    {day}
                                </Calendar.HeaderCell>
                            )}
                        </Calendar.GridHeader>
                        <Calendar.GridBody>
                            {(date) => (
                                <Calendar.Cell
                                    date={date}
                                    className="rounded-full flex items-center justify-center text-sm text-(--text-main) cursor-pointer hover:bg-(--primary)/10 hover:text-(--primary) outside-month:opacity-30 selected:bg-[var(--primary)] selected:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-(--primary)"
                                />
                            )}
                        </Calendar.GridBody>
                    </Calendar.Grid>

                    <Calendar.YearPickerGrid>
                        <Calendar.YearPickerGridBody>
                            {({ year }) => (
                                <Calendar.YearPickerCell
                                    year={year}
                                    className="px-3 py-1.5 text-sm text-(--text-main) rounded-lg cursor-pointer hover:bg-(--primary)/10 hover:text-(--primary) selected:bg-[var(--primary)] selected:text-white transition-colors outline-none"
                                />
                            )}
                        </Calendar.YearPickerGridBody>
                    </Calendar.YearPickerGrid>
                </Calendar>
            </DatePicker.Popover>
        </DatePicker>
    );
}
