"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { destinations } from '@/app/data/destinations';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NAV_BTN =
    'absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-(--surface) border border-(--border) text-(--text-main) shadow-lg hover:bg-(--primary) hover:border-(--primary) hover:text-white transition-colors z-10';

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
        }, 4500);
        return () => clearInterval(interval);
    }, [currentIndex, slidesPerView]);

    const handlePrev = () =>
        setCurrentIndex((prev) => (prev === 0 ? destinations.length - slidesPerView : prev - 1));

    const handleNext = () =>
        setCurrentIndex((prev) => (prev >= destinations.length - slidesPerView ? 0 : prev + 1));

    const dotCount = Math.max(0, destinations.length - slidesPerView + 1);

    return (
        <section id="destinos" className="py-24 bg-surface">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

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

                <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                >
                    {/* Track */}
                    <div
                        className="overflow-hidden rounded-2xl px-8 sm:px-0"
                        ref={containerRef}
                    >
                        <motion.div
                            className="flex"
                            animate={{ x: slideWidth > 0 ? -currentIndex * slideWidth : 0 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 32, mass: 1 }}
                        >
                            {destinations.map((dest, i) => (
                                <div
                                    key={i}
                                    className="w-[85%] sm:w-full md:w-1/2 lg:w-1/3 shrink-0 p-2"
                                    aria-label={`${dest.city}, ${dest.country}`}
                                >
                                    <motion.div
                                        className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-3/4"
                                        whileHover={{ scale: 1.015 }}
                                        transition={{ duration: 0.35, ease: EASE }}
                                    >
                                        <img
                                            src={dest.image}
                                            alt={`${dest.city}, ${dest.country}`}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                        />

                                        {/* Gradient layers */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                        {/* Content */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <motion.div
                                                className="flex items-center gap-1.5 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            >
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span className="text-xs uppercase tracking-widest font-medium">{dest.country}</span>
                                            </motion.div>
                                            <h3 className="text-3xl font-bold font-playfair leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                {dest.city}
                                            </h3>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Nav buttons */}
                    <motion.button
                        onClick={handlePrev}
                        className={`${NAV_BTN} left-1 sm:-left-5`}
                        whileTap={{ scale: 0.92 }}
                        aria-label="Destino anterior"
                    >
                        <ChevronLeft className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                        onClick={handleNext}
                        className={`${NAV_BTN} right-1 sm:-right-5`}
                        whileTap={{ scale: 0.92 }}
                        aria-label="Destino siguiente"
                    >
                        <ChevronRight className="w-3 h-3" />
                    </motion.button>

                    {/* Dots */}
                    <div className="flex justify-center items-center gap-2 mt-7">
                        {Array.from({ length: dotCount }).map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1.5 rounded-full transition-colors ${currentIndex === i ? 'bg-(--primary)' : 'bg-border hover:bg-(--text-secondary)'}`}
                                animate={{ width: currentIndex === i ? 28 : 6 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                aria-label={`Ir al destino ${i + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
