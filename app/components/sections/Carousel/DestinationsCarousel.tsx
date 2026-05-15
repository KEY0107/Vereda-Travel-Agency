"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { destinations } from '@/app/data/destinations';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function DestinationsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(3);
    const [slideWidth, setSlideWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const update = () => {
            const spv = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
            setSlidesPerView(spv);
            if (containerRef.current) {
                setSlideWidth(containerRef.current.offsetWidth / spv);
            }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev >= destinations.length - slidesPerView ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex, slidesPerView]);

    const handlePrev = () =>
        setCurrentIndex((prev) => (prev === 0 ? destinations.length - slidesPerView : prev - 1));

    const handleNext = () =>
        setCurrentIndex((prev) => (prev >= destinations.length - slidesPerView ? 0 : prev + 1));

    const dotCount = Math.max(0, destinations.length - slidesPerView + 1);

    return (
        <section id="destinos" className="py-24 bg-[var(--surface)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <SectionHeader
                        title="Destinos Destacados"
                        subtitle="Los lugares más increíbles del mundo te esperan"
                    />
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden" ref={containerRef}>
                        <motion.div
                            className="flex"
                            animate={{ x: slideWidth > 0 ? -currentIndex * slideWidth : 0 }}
                            transition={{ duration: 0.55, ease: EASE }}
                        >
                            {destinations.map((dest, i) => (
                                <div
                                    key={i}
                                    className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3"
                                    aria-label={`${dest.city}, ${dest.country}`}
                                >
                                    <motion.div
                                        className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/4]"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={dest.image}
                                            alt={`${dest.city}, ${dest.country}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <h3 className="text-3xl font-bold font-playfair mb-1">{dest.city}</h3>
                                            <p className="text-sm uppercase tracking-wider opacity-70">{dest.country}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--surface)] border-2 border-[var(--border)] text-[var(--text-main)] shadow-lg"
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--surface)] border-2 border-[var(--border)] text-[var(--text-main)] shadow-lg"
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>

                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: dotCount }).map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-2 rounded-full ${currentIndex === i ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`}
                                animate={{ width: currentIndex === i ? 32 : 8 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                aria-label={`Ir a la diapositiva ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
