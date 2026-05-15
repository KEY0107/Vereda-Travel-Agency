"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faqs } from '@/app/data/faq';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.5, ease: EASE, delay: index * 0.04 }}
                            className={`rounded-xl p-6 bg-[var(--surface)] border transition-colors duration-300 ${
                                openIndex === index
                                    ? 'border-[var(--primary)]/50 shadow-md shadow-[var(--primary)]/5'
                                    : 'border-[var(--border)]'
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-start justify-between gap-4 text-left"
                            >
                                <h3 className="font-semibold text-lg text-[var(--text-main)]">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.25, ease: EASE }}
                                    className="shrink-0 mt-0.5"
                                >
                                    <Plus className="w-6 h-6 text-[var(--primary)]" />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: EASE }}
                                        className="overflow-hidden"
                                    >
                                        <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
