"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { reviews } from '@/app/data/reviews';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reviews() {
    return (
        <section id="opiniones" className="py-24 bg-[var(--surface)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <SectionHeader
                        title="Lo Que Dicen Nuestros Viajeros"
                        subtitle="Historias reales de experiencias inolvidables"
                    />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.55, ease: EASE, delay: index * 0.07 }}
                            whileHover={{ y: -4 }}
                            className="relative rounded-2xl p-8 bg-[var(--background)] border border-[var(--border)] hover:shadow-2xl hover:shadow-black/10 transition-shadow duration-300"
                        >
                            <div className="absolute top-8 left-8 text-9xl leading-none opacity-10 pointer-events-none select-none font-playfair text-[var(--accent)]">
                                &ldquo;
                            </div>

                            <div className="relative z-10 flex gap-1 mb-4">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4" fill="#D4A843" stroke="#D4A843" />
                                ))}
                            </div>

                            <p className="relative z-10 mb-6 italic leading-relaxed text-[var(--text-secondary)]">
                                {review.comment}
                            </p>

                            <div className="relative z-10 flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold shrink-0 ${review.bgClass}`}>
                                    {review.initials}
                                </div>
                                <div>
                                    <div className="font-semibold text-[var(--text-main)]">{review.name}</div>
                                    <div className="text-sm text-[var(--text-secondary)]">{review.destination}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
