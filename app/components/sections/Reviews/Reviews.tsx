"use client";

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/app/data/reviews';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reviews() {
    return (
        <section id="opiniones" className="py-24 bg-surface">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 36, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: '-40px' }}
                            transition={{ duration: 0.55, ease: EASE, delay: index * 0.08 }}
                            whileHover={{ y: -5, transition: { duration: 0.25, ease: EASE } }}
                            className="relative rounded-2xl p-7 bg-background border border-border hover:border-(--primary)/30 hover:shadow-xl hover:shadow-black/8 transition-all duration-300 flex flex-col"
                        >
                            {/* Quote icon */}
                            <div className="mb-5">
                                <div className="w-9 h-9 rounded-xl bg-(--primary)/10 flex items-center justify-center">
                                    <Quote className="w-4 h-4 text-(--primary)" />
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4"
                                        fill={i < review.rating ? '#D4A843' : 'transparent'}
                                        stroke={i < review.rating ? '#D4A843' : 'var(--border)'}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="flex-1 text-sm leading-relaxed text-(--text-secondary) mb-6 italic">
                                &ldquo;{review.comment}&rdquo;
                            </p>

                            {/* Divider */}
                            <div className="h-px bg-border mb-5" />

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${review.bgClass}`}>
                                    {review.initials}
                                </div>
                                <div className="min-w-0">
                                    <div className="font-semibold text-sm text-(--text-main) truncate">{review.name}</div>
                                    <div className="text-xs text-(--text-secondary) truncate">{review.destination}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
