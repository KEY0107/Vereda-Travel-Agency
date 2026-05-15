"use client";

import { motion } from 'framer-motion';
import { Compass, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube } from '@/app/components/ui/SocialIcons';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const socialLinks = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Twitter, label: 'Twitter / X' },
    { Icon: Youtube, label: 'YouTube' },
];

const destinations = ['México', 'Europa', 'Asia', 'América del Sur', 'Caribe', 'Medio Oriente'];

const companyLinks = [
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Paquetes', id: 'paquetes' },
    { label: 'Testimonios', id: 'opiniones' },
];

const legalLinks = ['Privacidad', 'Términos', 'Cookies'];

export function Footer() {
    const scrollTo = (id: string) => {
        if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer id="contacto" className="bg-background border-t border-border">

            {/* CTA band */}
            <motion.div
                className="bg-(--primary) py-14"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: EASE }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-playfair text-white mb-1">
                            ¿Listo para tu próxima aventura?
                        </h2>
                        <p className="text-white/70 text-sm">Cotiza tu viaje sin costo · Respuesta en menos de 24 h</p>
                    </div>
                    <motion.button
                        onClick={() => scrollTo('contacto')}
                        className="flex items-center gap-2 px-7 py-3 rounded-full bg-white text-(--primary) font-semibold text-sm shrink-0 hover:bg-white/90 transition-colors shadow-lg"
                        whileHover={{ scale: 1.04, x: 2 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Cotizar ahora
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </div>
            </motion.div>

            {/* Main grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
                >
                    {/* Brand */}
                    <div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 mb-4"
                        >
                            <Compass className="w-7 h-7 text-(--primary)" />
                            <span className="text-xl font-bold font-playfair text-(--primary)">Vereda</span>
                        </button>
                        <p className="text-sm leading-relaxed text-(--text-secondary) mb-6">
                            Tu compañero de confianza para explorar el mundo sin límites desde 2013.
                        </p>
                        <div className="flex gap-2">
                            {socialLinks.map(({ Icon, label }) => (
                                <motion.button
                                    key={label}
                                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-border text-(--text-secondary) hover:bg-(--primary) hover:border-(--primary) hover:text-white transition-colors"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.93 }}
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-semibold text-(--text-main) mb-5">Destinos</h3>
                        <ul className="space-y-2.5">
                            {destinations.map((dest) => (
                                <li key={dest}>
                                    <button
                                        onClick={() => scrollTo('destinos')}
                                        className="text-sm text-(--text-secondary) hover:text-(--primary) transition-colors flex items-center gap-1.5 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-border group-hover:bg-(--primary) transition-colors shrink-0" />
                                        {dest}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-semibold text-(--text-main) mb-5">Empresa</h3>
                        <ul className="space-y-2.5">
                            {companyLinks.map(({ label, id }) => (
                                <li key={label}>
                                    <button
                                        onClick={() => scrollTo(id)}
                                        className="text-sm text-(--text-secondary) hover:text-(--primary) transition-colors flex items-center gap-1.5 group"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-border group-hover:bg-(--primary) transition-colors shrink-0" />
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest font-semibold text-(--text-main) mb-5">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-(--primary)" />
                                <span className="text-sm text-(--text-secondary)">Ciudad Juárez, Chihuahua, México</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 shrink-0 text-(--primary)" />
                                <a href="tel:+526561234567" className="text-sm text-(--text-secondary) hover:text-(--primary) transition-colors">
                                    +52 (656) 123-4567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 shrink-0 text-(--primary)" />
                                <a href="mailto:contacto@veredaviajes.mx" className="text-sm text-(--text-secondary) hover:text-(--primary) transition-colors">
                                    contacto@veredaviajes.mx
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-(--primary)" />
                                <div className="text-sm text-(--text-secondary) space-y-0.5">
                                    <div>Lun–Vie 9am–7pm</div>
                                    <div>Sáb 10am–3pm</div>
                                    <div className="text-xs text-(--primary) font-medium mt-1">WhatsApp 24/7</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-(--text-secondary)">© 2025 Vereda. Todos los derechos reservados.</p>
                    <div className="flex gap-5">
                        {legalLinks.map((t) => (
                            <button key={t} className="text-xs text-(--text-secondary) hover:text-(--primary) transition-colors">
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
