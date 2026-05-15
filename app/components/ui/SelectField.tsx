"use client";

import { Select, ListBox } from '@heroui/react';

const TRIGGER_CLASS =
    'w-full flex items-center justify-between px-3 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--text-main)] text-sm cursor-pointer hover:border-[var(--primary)]/50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 transition-all';

interface SelectFieldProps {
    label: string;
    options: string[];
    placeholder?: string;
}

export function SelectField({ label, options, placeholder = 'Selecciona una opción' }: SelectFieldProps) {
    return (
        <Select aria-label={label} fullWidth placeholder={placeholder}>
            <Select.Trigger className={TRIGGER_CLASS}>
                <Select.Value className="text-(--text-secondary) data-placeholder:text-(--text-secondary)" />
                <Select.Indicator className="w-4 h-4 text-(--text-secondary) shrink-0" />
            </Select.Trigger>
            <Select.Popover className="z-50 min-w-45 rounded-xl bg-surface border border-border shadow-xl shadow-black/10 overflow-hidden p-1">
                <ListBox aria-label={label} className="outline-none">
                    {options.map((o) => (
                        <ListBox.Item
                            key={o}
                            id={o}
                            textValue={o}
                            className="flex items-center justify-between px-3 py-2 text-sm text-(--text-main) rounded-lg cursor-pointer outline-none hover:bg-(--primary)/10 hover:text-(--primary) selected:bg-[var(--primary)]/15 selected:text-[var(--primary)] selected:font-medium transition-colors"
                        >
                            {o}
                            <ListBox.ItemIndicator className="text-(--primary)" />
                        </ListBox.Item>
                    ))}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}
