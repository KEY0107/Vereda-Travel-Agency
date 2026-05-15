"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { packages } from '@/app/data/packages';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import type { Package } from '@/app/types';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardVariants = {
    hidden: { opacity: 0, y: 32, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 1, ease: EASE, delay: i * 0.07 },
    }),
    exit: { opacity: 0, scale: 0.95, transition: { duration: 1 } },
};

type FilterType = 'Todos' | Package['type'] | Package['category'];
const filters: FilterType[] = ['Todos', 'Nacional', 'Internacional', 'Aventura', 'Playa', 'Cultural', 'Luna de Miel'];

export function Packages() {
    const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');

    const filteredPackages = packages.filter((pkg) => {
        if (activeFilter === 'Todos') return true;
        if (activeFilter === 'Nacional' || activeFilter === 'Internacional') return pkg.type === activeFilter;
        return pkg.category === activeFilter;
    });

    return (
        <section id="paquetes" className="pt-32 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <SectionHeader
                        title="Paquetes de Viaje"
                        subtitle="Experiencias cuidadosamente diseñadas para cada tipo de viajero"
                    />
                </motion.div>

                {/* Filters */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                >
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`relative px-5 py-2 rounded-full font-medium text-sm transition-colors border overflow-hidden ${activeFilter === filter
                                    ? 'text-white border-(--primary)'
                                    : 'bg-transparent text-(--text-main) border-border hover:border-(--primary) hover:text-(--primary)'
                                }`}
                        >
                            {activeFilter === filter && (
                                <motion.span
                                    layoutId="filter-pill"
                                    className="absolute inset-0 bg-(--primary)"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{filter}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPackages.map((pkg, i) => (
                            <motion.div
                                key={pkg.id}
                                layout
                                custom={i}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                whileHover={{ y: -8, transition: { duration: 0.25, ease: EASE } }}
                                className="group rounded-2xl overflow-hidden bg-surface border border-border shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-shadow duration-300 cursor-pointer flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative overflow-hidden aspect-video shrink-0">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-101"
                                    />
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm ${pkg.type === 'Nacional' ? 'bg-(--primary)/90' : 'bg-(--accent)/90'}`}>
                                        {pkg.type}
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Body */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="text-xs uppercase tracking-wider text-(--text-secondary) mb-1.5">
                                        {pkg.location}
                                    </div>
                                    <h3 className="text-xl font-bold font-playfair text-(--text-main) mb-2 leading-snug">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-sm text-(--text-secondary) mb-4 line-clamp-2 leading-relaxed flex-1">
                                        {pkg.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-xs text-(--text-secondary) mb-5">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 shrink-0" />
                                            {pkg.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                                            {pkg.feature}
                                        </span>
                                    </div>

                                    {/* Footer */}
                                    <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                                        <div>
                                            <div className="text-[10px] uppercase tracking-widest text-(--text-secondary) mb-0.5">Desde</div>
                                            <div className="text-2xl font-bold text-(--text-main) leading-none">{pkg.price}</div>
                                            <div className="text-[10px] text-(--text-secondary) mt-0.5">por persona</div>
                                        </div>
                                        <motion.button
                                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white font-semibold bg-(--primary) hover:bg-(--primary-hover) transition-colors shadow-md shadow-(--primary)/20 shrink-0"
                                            whileHover={{ scale: 1.04, gap: '10px' }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Ver más
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <motion.div
                    className="text-center mt-14"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                >
                    <motion.button
                        className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm border-2 border-(--primary) text-(--primary) hover:bg-(--primary) hover:text-white transition-colors group"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Ver todos los paquetes
                        <span className="w-6 h-6 rounded-full border border-(--primary) flex items-center justify-center group-hover:border-white transition-colors">
                            <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
