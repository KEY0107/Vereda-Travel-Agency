"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { packages } from '@/app/data/packages';
import { SectionHeader } from '@/app/components/ui/SectionHeader';
import type { Package } from '@/app/types';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
        <section id="paquetes" className="pt-32 pb-24 bg-[var(--background)]">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                >
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`relative px-6 py-2 rounded-full font-medium text-sm transition-colors border overflow-hidden ${
                                activeFilter === filter
                                    ? 'text-white border-[var(--primary)]'
                                    : 'bg-transparent text-[var(--text-main)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                            }`}
                        >
                            {activeFilter === filter && (
                                <motion.span
                                    layoutId="filter-pill"
                                    className="absolute inset-0 bg-[var(--primary)]"
                                    transition={{ duration: 0.3, ease: EASE }}
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
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="group rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)] shadow-sm hover:shadow-2xl hover:shadow-black/10 transition-shadow duration-300 cursor-pointer"
                            >
                                <div className="relative overflow-hidden aspect-video">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${pkg.type === 'Nacional' ? 'bg-[var(--primary)]' : 'bg-[var(--accent)]'}`}>
                                        {pkg.type}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">
                                        {pkg.location}
                                    </div>
                                    <h3 className="text-xl font-bold font-playfair text-[var(--text-main)] mb-3">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                                        {pkg.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-4">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{pkg.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{pkg.feature}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-[var(--border)]">
                                        <div>
                                            <div className="text-xs text-[var(--text-secondary)]">Desde</div>
                                            <div className="text-xl font-bold text-[var(--text-main)]">{pkg.price}</div>
                                        </div>
                                        <motion.button
                                            className="px-6 py-2 rounded-full text-white font-medium bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.97 }}
                                        >
                                            Ver más
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.button
                        className="px-8 py-3 rounded-full font-medium border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white transition-colors"
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Ver todos los paquetes
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
