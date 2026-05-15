"use client";

import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface StepperProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    label?: string;
}

export function Stepper({ value, min = 1, max = 20, onChange, label }: StepperProps) {
    return (
        <div className="flex items-center gap-3" aria-label={label}>
            <motion.button
                type="button"
                onClick={() => onChange(Math.max(min, value - 1))}
                disabled={value <= min}
                className="w-9 h-9 rounded-xl border border-border bg-surface flex items-center justify-center text-(--text-secondary) hover:bg-(--primary)/10 hover:border-(--primary)/40 hover:text-(--primary) disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                whileTap={{ scale: 0.88 }}
                aria-label="Disminuir"
            >
                <Minus className="w-3.5 h-3.5" />
            </motion.button>

            <motion.span
                key={value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="w-8 text-center font-semibold text-(--text-main) text-base tabular-nums select-none"
            >
                {value}
            </motion.span>

            <motion.button
                type="button"
                onClick={() => onChange(Math.min(max, value + 1))}
                disabled={value >= max}
                className="w-9 h-9 rounded-xl border border-border bg-surface flex items-center justify-center text-(--text-secondary) hover:bg-(--primary)/10 hover:border-(--primary)/40 hover:text-(--primary) disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                whileTap={{ scale: 0.88 }}
                aria-label="Aumentar"
            >
                <Plus className="w-3.5 h-3.5" />
            </motion.button>
        </div>
    );
}
