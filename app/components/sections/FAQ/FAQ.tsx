"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/app/data/faq';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const half = Math.ceil(faqs.length / 2);
const columns = [faqs.slice(0, half), faqs.slice(half)];

function FAQItem({
    question,
    answer,
    index,
    globalIndex,
    isOpen,
    onToggle,
}: {
    question: string;
    answer: string;
    index: number;
    globalIndex: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-32px' }}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
            className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                isOpen
                    ? 'border-(--primary)/40 bg-surface shadow-sm shadow-(--primary)/8'
                    : 'border-border bg-surface hover:border-(--primary)/30'
            }`}
        >
            <button
                onClick={onToggle}
                className="w-full flex items-start gap-4 p-6 text-left"
                aria-expanded={isOpen}
            >
                <span className="shrink-0 w-6 h-6 rounded-full bg-(--primary)/10 text-(--primary) text-xs font-bold flex items-center justify-center mt-0.5">
                    {globalIndex + 1}
                </span>
                <h3 className="flex-1 font-semibold text-(--text-main) leading-snug">
                    {question}
                </h3>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="shrink-0 mt-0.5"
                >
                    <Plus className="w-5 h-5 text-(--primary)" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                    >
                        <p className="px-6 pb-6 pl-16 text-sm leading-relaxed text-(--text-secondary)">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <SectionHeader
                        title="Preguntas Frecuentes"
                        subtitle="Resolvemos tus dudas más comunes"
                    />
                </motion.div>

                <div className="flex flex-col md:flex-row gap-4">
                    {columns.map((col, colIdx) => (
                        <div key={colIdx} className="flex-1 flex flex-col gap-4">
                            {col.map((faq, rowIdx) => {
                                const globalIndex = colIdx * half + rowIdx;
                                return (
                                    <FAQItem
                                        key={globalIndex}
                                        question={faq.question}
                                        answer={faq.answer}
                                        index={rowIdx}
                                        globalIndex={globalIndex}
                                        isOpen={openIndex === globalIndex}
                                        onToggle={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
