"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, ReceiptText, X, Check } from 'lucide-react';
import { QUOTE_STORAGE_KEY, type QuoteSummary } from '@/app/data/quoter';
import { SectionHeader } from '@/app/components/ui/SectionHeader';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface FormState {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', message: '' };

function formatMXN(amount: number) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(amount);
}

function InputField({
    icon: Icon,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required,
}: {
    icon: React.ElementType;
    label: string;
    type?: string;
    value: string;
    onChange: (v: string) => void;
    placeholder: string;
    required?: boolean;
}) {
    return (
        <div>
            <label className="block text-xs font-semibold text-(--text-secondary) uppercase tracking-widest mb-2">
                {label}{required && <span className="text-(--primary) ml-0.5">*</span>}
            </label>
            <div className="relative">
                <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-secondary) pointer-events-none" />
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    required={required}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-(--text-main) text-sm placeholder:text-(--text-secondary)/60 focus:outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all"
                />
            </div>
        </div>
    );
}

export function Contact() {
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [savedQuote, setSavedQuote] = useState<QuoteSummary | null>(null);
    const [quoteBannerOpen, setQuoteBannerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const raw = localStorage.getItem(QUOTE_STORAGE_KEY);
        if (!raw) return;
        try {
            const q: QuoteSummary = JSON.parse(raw);
            setSavedQuote(q);
            setQuoteBannerOpen(true);
        } catch { /* ignore */ }
    }, []);

    const applyQuote = () => {
        if (!savedQuote) return;
        setForm((f) => ({
            ...f,
            message: `Hola, me interesa la cotización que generé:\n\nDestino: ${savedQuote.destinationLabel}\nViajeros: ${savedQuote.people}\nNoches: ${savedQuote.days}\nServicio: ${savedQuote.tierLabel}\nTotal estimado: ${formatMXN(savedQuote.totalPrice)}`,
        }));
        setQuoteBannerOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1400));
        setLoading(false);
        setSent(true);
        setForm(EMPTY_FORM);
    };

    const set = (field: keyof FormState) => (value: string) => setForm((f) => ({ ...f, [field]: value }));

    return (
        <section id="contacto" className="py-24 bg-background">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.7, ease: EASE }}
                >
                    <SectionHeader
                        title="Hablemos de Tu Viaje"
                        subtitle="Nuestro equipo te responderá en menos de 24 horas"
                    />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-10 items-start">
                    {/* ── Left info panel (below form on mobile) ── */}
                    <motion.div
                        className="lg:col-span-2 space-y-6 order-2 lg:order-1"
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
                    >
                        <div className="rounded-2xl border border-border bg-surface p-7 space-y-5">
                            <h3 className="font-bold font-playfair text-xl text-(--text-main)">¿Por qué contactarnos?</h3>
                            {[
                                { text: 'Cotizaciones personalizadas sin costo ni compromiso' },
                                { text: 'Respuesta garantizada en menos de 24 horas' },
                                { text: 'Más de 120 destinos disponibles con alianzas locales' },
                                { text: 'Garantía de precio y flexibilidad de cambios' },
                                { text: 'Atención por WhatsApp, teléfono o correo' },
                            ].map(({ text }) => (
                                <div key={text} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-(--primary) shrink-0" />
                                    <p className="text-sm text-(--text-secondary) leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
                            <div className="text-xs font-semibold text-(--text-secondary) uppercase tracking-widest mb-1">Contacto directo</div>
                            <a href="tel:+526561234567" className="flex items-center gap-3 text-sm text-(--text-secondary) hover:text-(--primary) transition-colors group">
                                <Phone className="w-4 h-4 text-(--primary) shrink-0" />
                                +52 (656) 123-4567
                            </a>
                            <a href="mailto:contacto@veredaviajes.mx" className="flex items-center gap-3 text-sm text-(--text-secondary) hover:text-(--primary) transition-colors">
                                <Mail className="w-4 h-4 text-(--primary) shrink-0" />
                                contacto@veredaviajes.mx
                            </a>
                        </div>
                    </motion.div>

                    {/* ── Form (first on mobile) ── */}
                    <motion.div
                        className="lg:col-span-3 order-1 lg:order-2"
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
                    >
                        {/* Saved quote banner */}
                        <AnimatePresence>
                            {quoteBannerOpen && savedQuote && (
                                <motion.div
                                    initial={{ opacity: 0, y: -12, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -12, height: 0 }}
                                    transition={{ duration: 0.28, ease: EASE }}
                                    className="overflow-hidden mb-4"
                                >
                                    <div className="flex items-start gap-3 rounded-xl border border-(--primary)/30 bg-(--primary)/5 px-4 py-3">
                                        <ReceiptText className="w-4 h-4 text-(--primary) shrink-0 mt-0.5" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-(--text-main)">
                                                Tienes una cotización guardada — {savedQuote.destinationLabel}, {formatMXN(savedQuote.totalPrice)}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={applyQuote}
                                                className="text-xs text-(--primary) font-semibold hover:underline mt-0.5"
                                            >
                                                Incluir en el mensaje →
                                            </button>
                                        </div>
                                        <button type="button" onClick={() => setQuoteBannerOpen(false)} className="text-(--text-secondary) hover:text-(--text-main) transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="rounded-2xl border border-border bg-surface p-7">
                            <AnimatePresence mode="wait">
                                {sent ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.92 }}
                                        transition={{ duration: 0.35, ease: EASE }}
                                        className="flex flex-col items-center justify-center py-16 text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', stiffness: 320, damping: 20, delay: 0.1 }}
                                            className="w-16 h-16 rounded-full bg-(--primary)/10 flex items-center justify-center mb-5"
                                        >
                                            <CheckCircle2 className="w-8 h-8 text-(--primary)" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold font-playfair text-(--text-main) mb-2">¡Mensaje enviado!</h3>
                                        <p className="text-sm text-(--text-secondary) max-w-xs leading-relaxed">
                                            Gracias por contactarnos. Te responderemos pronto con tu cotización personalizada.
                                        </p>
                                        <motion.button
                                            type="button"
                                            onClick={() => setSent(false)}
                                            className="mt-8 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-(--text-secondary) hover:border-(--primary)/40 hover:text-(--primary) transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Enviar otro mensaje
                                        </motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        ref={formRef}
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.25, ease: EASE }}
                                        className="space-y-5"
                                        noValidate
                                    >
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <InputField icon={User} label="Nombre" value={form.name} onChange={set('name')} placeholder="Tu nombre" required />
                                            <InputField icon={Mail} label="Correo" type="email" value={form.email} onChange={set('email')} placeholder="tu@correo.com" required />
                                        </div>
                                        <InputField icon={Phone} label="Teléfono" type="tel" value={form.phone} onChange={set('phone')} placeholder="+52 (656) 000-0000" />
                                        <div>
                                            <label className="block text-xs font-semibold text-(--text-secondary) uppercase tracking-widest mb-2">
                                                Mensaje<span className="text-(--primary) ml-0.5">*</span>
                                            </label>
                                            <div className="relative">
                                                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-(--text-secondary) pointer-events-none" />
                                                <textarea
                                                    value={form.message}
                                                    onChange={(e) => set('message')(e.target.value)}
                                                    placeholder="Cuéntanos sobre tu viaje ideal..."
                                                    required
                                                    rows={5}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface text-(--text-main) text-sm placeholder:text-(--text-secondary)/60 focus:outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20 transition-all resize-none"
                                                />
                                            </div>
                                        </div>

                                        <motion.button
                                            type="submit"
                                            disabled={loading || !form.name || !form.email || !form.message}
                                            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-(--primary) text-white font-semibold text-sm hover:bg-(--primary)/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-(--primary)/25"
                                            whileHover={{ scale: 1.01, y: -1 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {loading ? (
                                                    <motion.div
                                                        key="spinner"
                                                        initial={{ opacity: 0, rotate: -90 }}
                                                        animate={{ opacity: 1, rotate: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                                                    />
                                                ) : (
                                                    <motion.span
                                                        key="label"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Send className="w-4 h-4" />
                                                        Enviar mensaje
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
