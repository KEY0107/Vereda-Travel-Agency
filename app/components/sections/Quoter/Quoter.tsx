"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Calendar, Star, ChevronDown, Receipt, Sparkles } from 'lucide-react';
import {
    destinations,
    serviceTiers,
    extraServices,
    calculatePrice,
    QUOTE_STORAGE_KEY,
    type QuoteSummary,
} from '@/app/data/quoter';
import { Stepper } from '@/app/components/ui/Stepper';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TIER_COLORS = {
    basic: 'border-border bg-surface',
    standard: 'border-(--primary)/50 bg-(--primary)/5',
    premium: 'border-amber-400/60 bg-amber-50/50 dark:bg-amber-400/5',
};

const TIER_BADGE = {
    basic: 'text-(--text-secondary)',
    standard: 'text-(--primary)',
    premium: 'text-amber-500',
};

function formatMXN(amount: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount);
}

export function Quoter() {
    const [destinationId, setDestinationId] = useState(destinations[0].id);
    const [people, setPeople] = useState(2);
    const [days, setDays] = useState(7);
    const [tierId, setTierId] = useState<'basic' | 'standard' | 'premium'>('standard');
    const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());
    const [destOpen, setDestOpen] = useState(false);

    const destination = destinations.find((d) => d.id === destinationId)!;
    const tier = serviceTiers.find((t) => t.id === tierId)!;
    const extras = extraServices.filter((e) => selectedExtras.has(e.id));
    const { total, perPerson, breakdown } = calculatePrice(destination, people, days, tier, extras);

    const toggleExtra = (id: string) => {
        setSelectedExtras((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const saveQuote = useCallback(() => {
        const quote: QuoteSummary = {
            destinationId,
            destinationLabel: destination.label,
            people,
            days,
            tierId,
            tierLabel: tier.label,
            extraServiceIds: [...selectedExtras],
            totalPrice: total,
            pricePerPerson: perPerson,
            savedAt: Date.now(),
        };
        localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quote));
    }, [destinationId, destination, people, days, tierId, tier, selectedExtras, total, perPerson]);

    useEffect(() => {
        saveQuote();
    }, [saveQuote]);

    useEffect(() => {
        const saved = localStorage.getItem(QUOTE_STORAGE_KEY);
        if (!saved) return;
        try {
            const q: QuoteSummary = JSON.parse(saved);
            if (destinations.find((d) => d.id === q.destinationId)) setDestinationId(q.destinationId);
            if (q.people >= 1 && q.people <= 20) setPeople(q.people);
            if (q.days >= 1 && q.days <= 30) setDays(q.days);
            if (['basic', 'standard', 'premium'].includes(q.tierId)) setTierId(q.tierId as typeof tierId);
            if (Array.isArray(q.extraServiceIds)) setSelectedExtras(new Set(q.extraServiceIds));
        } catch { /* ignore malformed */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="cotizador" className="py-24 bg-surface overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <SectionHeader
                        title="Cotiza Tu Viaje"
                        subtitle="Personaliza tu experiencia y obtén un precio estimado al instante"
                    />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* ── Form (left on desktop, below summary on mobile) ── */}
                    <motion.div
                        className="lg:col-span-3 space-y-6 order-2 lg:order-1 min-w-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
                    >
                        {/* Destination */}
                        <div className="rounded-2xl border border-border bg-background p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="w-4 h-4 text-(--primary)" />
                                <span className="text-sm font-semibold text-(--text-main)">Destino</span>
                            </div>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setDestOpen((o) => !o)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-surface text-(--text-main) text-sm hover:border-(--primary)/50 transition-colors"
                                    aria-expanded={destOpen}
                                >
                                    <span>{destination.label}</span>
                                    <motion.span animate={{ rotate: destOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown className="w-4 h-4 text-(--text-secondary)" />
                                    </motion.span>
                                </button>

                                <AnimatePresence>
                                    {destOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                            transition={{ duration: 0.18, ease: EASE }}
                                            className="absolute z-20 top-full mt-2 w-full rounded-xl border border-border bg-background shadow-xl shadow-black/10 overflow-hidden"
                                        >
                                            <div className="max-h-64 overflow-y-auto p-1">
                                                {destinations.map((d) => (
                                                    <button
                                                        key={d.id}
                                                        type="button"
                                                        onClick={() => { setDestinationId(d.id); setDestOpen(false); }}
                                                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-colors ${
                                                            d.id === destinationId
                                                                ? 'bg-(--primary)/10 text-(--primary) font-medium'
                                                                : 'text-(--text-main) hover:bg-surface'
                                                        }`}
                                                    >
                                                        <span>{d.label}</span>
                                                        <span className="text-xs text-(--text-secondary)">{d.region}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* People & Days */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-border bg-background p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Users className="w-4 h-4 text-(--primary)" />
                                    <span className="text-sm font-semibold text-(--text-main)">Viajeros</span>
                                </div>
                                <Stepper value={people} min={1} max={20} onChange={setPeople} label="Número de viajeros" />
                                <p className="text-xs text-(--text-secondary) mt-3">
                                    {people === 1 ? '1 persona' : `${people} personas`}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-border bg-background p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Calendar className="w-4 h-4 text-(--primary)" />
                                    <span className="text-sm font-semibold text-(--text-main)">Duración</span>
                                </div>
                                <Stepper value={days} min={1} max={30} onChange={setDays} label="Número de noches" />
                                <p className="text-xs text-(--text-secondary) mt-3">
                                    {days === 1 ? '1 noche' : `${days} noches`}
                                </p>
                            </div>
                        </div>

                        {/* Service Tier */}
                        <div className="rounded-2xl border border-border bg-background p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-4 h-4 text-(--primary)" />
                                <span className="text-sm font-semibold text-(--text-main)">Tipo de servicio</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                {serviceTiers.map((t) => (
                                    <motion.button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setTierId(t.id)}
                                        className={`relative rounded-xl border p-3 sm:p-4 text-left transition-all duration-200 ${
                                            tierId === t.id
                                                ? TIER_COLORS[t.id] + ' shadow-sm'
                                                : 'border-border bg-surface hover:border-(--primary)/30'
                                        }`}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {tierId === t.id && (
                                            <motion.div
                                                layoutId="tier-indicator"
                                                className="absolute inset-0 rounded-xl ring-2 ring-(--primary)/30"
                                                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                                            />
                                        )}
                                        <div className={`text-xs font-bold mb-1 ${TIER_BADGE[t.id]}`}>{t.label}</div>
                                        <div className="text-xs text-(--text-secondary) leading-snug">{t.description}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Extra Services */}
                        <div className="rounded-2xl border border-border bg-background p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-4 h-4 text-(--primary)" />
                                <span className="text-sm font-semibold text-(--text-main)">Servicios adicionales</span>
                            </div>
                            <div className="space-y-3">
                                {extraServices.map((service) => {
                                    const checked = selectedExtras.has(service.id);
                                    return (
                                        <motion.button
                                            key={service.id}
                                            type="button"
                                            onClick={() => toggleExtra(service.id)}
                                            className={`w-full flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${
                                                checked
                                                    ? 'border-(--primary)/40 bg-(--primary)/5'
                                                    : 'border-border bg-surface hover:border-(--primary)/30'
                                            }`}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <div className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                                                checked ? 'bg-(--primary) border-(--primary)' : 'border-border'
                                            }`}>
                                                <AnimatePresence>
                                                    {checked && (
                                                        <motion.svg
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            exit={{ scale: 0, opacity: 0 }}
                                                            transition={{ duration: 0.15 }}
                                                            viewBox="0 0 12 10" fill="none" className="w-3 h-3"
                                                        >
                                                            <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                        </motion.svg>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="text-sm font-medium text-(--text-main) leading-snug">{service.label}</div>
                                                    <div className="text-sm font-semibold text-(--primary) shrink-0 whitespace-nowrap">
                                                        +{formatMXN(service.pricePerPerson)}<span className="text-xs font-normal text-(--text-secondary)">/p</span>
                                                    </div>
                                                </div>
                                                <div className="text-xs text-(--text-secondary) mt-0.5">{service.description}</div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Price Summary (top on mobile, right sticky on desktop) ── */}
                    <motion.div
                        className="lg:col-span-2 lg:sticky lg:top-24 order-1 lg:order-2 min-w-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
                    >
                        <div className="rounded-2xl border border-border bg-background overflow-hidden">
                            {/* Header */}
                            <div className="bg-(--primary) px-6 py-5">
                                <div className="flex items-center gap-2 mb-1">
                                    <Receipt className="w-4 h-4 text-white/80" />
                                    <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Cotización</span>
                                </div>
                                <div className="text-xs text-white/60">{destination.label} · {tier.label}</div>
                            </div>

                            <div className="p-6 space-y-5">
                                {/* Big price */}
                                <div className="text-center py-4 border-b border-border">
                                    <motion.div
                                        key={total}
                                        initial={{ scale: 0.85, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 340, damping: 24 }}
                                        className="text-4xl font-bold font-playfair text-(--primary)"
                                    >
                                        {formatMXN(total)}
                                    </motion.div>
                                    <div className="text-xs text-(--text-secondary) mt-1">
                                        {formatMXN(perPerson)} por persona
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-3">
                                    <div className="text-xs font-semibold text-(--text-secondary) uppercase tracking-widest">Desglose</div>
                                    <AnimatePresence mode="popLayout">
                                        {breakdown.map((item) => (
                                            <motion.div
                                                key={item.label}
                                                layout
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.22, ease: EASE }}
                                                className="flex items-start justify-between gap-2 text-sm min-w-0"
                                            >
                                                <span className="text-(--text-secondary) leading-snug min-w-0">{item.label}</span>
                                                <span className="font-semibold text-(--text-main) shrink-0 whitespace-nowrap">{formatMXN(item.amount)}</span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>

                                {/* Trip summary pills */}
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                                    {[
                                        `${people} viajero${people > 1 ? 's' : ''}`,
                                        `${days} noche${days > 1 ? 's' : ''}`,
                                        tier.label,
                                        ...extras.map((e) => e.label),
                                    ].map((tag) => (
                                        <span key={tag} className="px-2.5 py-1 rounded-full bg-(--primary)/10 text-(--primary) text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA */}
                                <motion.a
                                    href="#contacto"
                                    onClick={(e) => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-(--primary) text-white font-semibold text-sm hover:bg-(--primary)/90 transition-colors shadow-lg shadow-(--primary)/25"
                                    whileHover={{ scale: 1.02, y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Solicitar esta cotización
                                </motion.a>

                                <p className="text-xs text-(--text-secondary) text-center">
                                    Precio estimado · Sin compromiso · Respuesta en 24 h
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
