"use client";

import { useRef, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Data ──────────────────────────────────────────────────────── */
const headingWords = ['Descubre', 'el', 'mundo'];

const stats = [
    { value: 12,   suffix: '+', label: 'Años de experiencia' },
    { value: 4800, suffix: '+', label: 'Viajeros felices' },
    { value: 85,   suffix: '',  label: 'Destinos' },
];

const videoBubbles = [
    {
        label: 'Cancún, México',
        poster: 'https://images.unsplash.com/photo-1630252452598-56d592ceec50?w=480&q=80',
        src: 'https://www.pexels.com/es-es/download/video/27785059/',
        size: 'w-72 h-72',
        pos:  'top-0 right-0',
        float: { y: [0, 1, 0], duration: 5.5, delay: 0 },
        entrance: 0.4,
    },
    {
        label: 'París, Francia',
        poster: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=480&q=80',
        src: 'https://www.pexels.com/es-es/download/video/37581671/',
        size: 'w-52 h-52',
        pos:  'top-40 left-4',
        float: { y: [0, 1, 0], duration: 6.5, delay: 1.2 },
        entrance: 0.6,
    },
    {
        label: 'Cusco, Perú',
        poster: 'https://images.unsplash.com/photo-1564551099958-799746bfe1aa?w=480&q=80',
        src: 'https://www.pexels.com/es-es/download/video/7055325/',
        size: 'w-44 h-44',
        pos:  'bottom-0 right-20',
        float: { y: [0, 1, 0], duration: 4.8, delay: 0.7 },
        entrance: 0.8,
    },
] as const;

/* ── Counter ───────────────────────────────────────────────────── */
function Counter({ to, suffix }: { to: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ctrl = animate(0, to, {
            duration: 2, ease: 'easeOut', delay: 1.2,
            onUpdate(v) { el.textContent = Math.round(v).toLocaleString('es-MX'); },
        });
        return () => ctrl.stop();
    }, [to]);
    return <><span ref={ref}>0</span>{suffix}</>;
}

/* ── Variants ──────────────────────────────────────────────────── */
const wordVariants = {
    hidden:  { y: 80, opacity: 0, rotateX: 30 },
    visible: { y: 0,  opacity: 1, rotateX: 0,
        transition: { duration: 0.75, ease: EASE } },
};
const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};
function fadeUp(delay: number) {
    return {
        initial: { y: 32, opacity: 0 },
        animate:  { y: 0,  opacity: 1 },
        transition: { duration: 0.7, ease: EASE, delay },
    };
}

/* ── Hero ──────────────────────────────────────────────────────── */
export function Hero() {
    const bgRef      = useRef<HTMLImageElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (id: string) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    /* GSAP: parallax scale on background image */
    useEffect(() => {
        const bg      = bgRef.current;
        const overlay = overlayRef.current;
        if (!bg || !overlay) return;

        const ctx = gsap.context(() => {
            gsap.to(bg, {
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: '60% top',
                    scrub: 1.5,
                },
            });
            gsap.to(overlay, {
                opacity: 0.97,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: '35% top',
                    scrub: 1,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* ── Background image (animated by GSAP) ─────────── */}
            <img
                ref={bgRef}
                src="https://images.unsplash.com/photo-1598493139190-2f76d4ae7ac7?w=1920&q=85"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover origin-center"
            />

            {/* ── Gradient overlay ─────────────────────────────── */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-linear-to-br from-[#0a1510]/88 via-[#1a2e26]/80 to-[#0d1a14]/92"
            />

            {/* ── Content ──────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-25">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* ─── Left: text content ─────────────────── */}
                    <div>
                        {/* Badge */}
                        <motion.div
                            {...fadeUp(0)}
                            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
                        >
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 shrink-0" />
                            <span className="text-white/90 text-sm font-medium">
                                Más de 4,800 viajeros satisfechos
                            </span>
                        </motion.div>

                        {/* H1 — word reveal */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap gap-x-4"
                        >
                            {headingWords.map((word) => (
                                <div key={word} className="overflow-hidden">
                                    <motion.h1
                                        variants={wordVariants}
                                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-playfair leading-none"
                                    >
                                        {word}
                                    </motion.h1>
                                </div>
                            ))}
                        </motion.div>

                        {/* Accent */}
                        <div className="overflow-hidden mb-2">
                            <motion.p
                                {...fadeUp(0.55)}
                                className="text-2xl sm:text-3xl lg:text-4xl italic font-playfair text-accent"
                            >
                                a tu manera.
                            </motion.p>
                        </div>

                        {/* Subtitle */}
                        <motion.p
                            {...fadeUp(0.75)}
                            className="text-white/75 text-lg max-w-md mb-4 leading-relaxed"
                        >
                            Experiencias de viaje personalizadas que transforman tus sueños en realidad.
                            Desde aventuras nacionales hasta destinos exóticos internacionales.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div {...fadeUp(0.9)} className="flex flex-wrap gap-4 mb-5">
                            <motion.button
                                onClick={() => scrollToSection('paquetes')}
                                className="px-8 py-2 rounded-full text-white font-semibold bg-(--primary) shadow-lg shadow-(--primary)/40 hover:bg-(--primary-hover) transition-colors"
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Explorar Paquetes
                            </motion.button>
                            <motion.button
                                onClick={() => scrollToSection('destinos')}
                                className="px-8 py-2 rounded-full text-white font-semibold border-2 border-white/35 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/55 transition-colors"
                                whileHover={{ scale: 1.04, y: -3 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Ver Destinos
                            </motion.button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            {...fadeUp(1.05)}
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/15"
                        >
                            {stats.map(({ value, suffix, label }) => (
                                <div key={label}>
                                    <div className="text-3xl font-bold text-white mb-1">
                                        <Counter to={value} suffix={suffix} />
                                    </div>
                                    <div className="text-white/50 text-xs leading-snug">{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ─── Right: floating video bubbles ──────────── */}
                    <div className="hidden lg:block relative h-130">
                        {videoBubbles.map(({ label, poster, src, size, pos, float, entrance }) => (
                            <motion.div
                                key={label}
                                className={`absolute ${pos} ${size} rounded-full overflow-hidden border-2 border-white/20 shadow-2xl shadow-black/40`}
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: EASE, delay: entrance }}
                            >
                                {/* Float wrapper */}
                                <motion.div
                                    className="w-full h-full"
                                    animate={{ y: [...float.y] }}
                                    transition={{
                                        duration: float.duration,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: float.delay,
                                    }}
                                >
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        poster={poster}
                                        className="w-full h-full object-cover"
                                    >
                                        <source src={src} type="video/mp4" />
                                    </video>

                                    {/* Label chip */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 whitespace-nowrap">
                                        <span className="text-white text-xs font-medium">{label}</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}

                        {/* Connecting glow between circles */}
                        <div className="absolute inset-0 rounded-full bg-(--primary)/5 blur-3xl pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* ── Scroll indicator ─────────────────────────────── */}
            <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                onClick={() => scrollToSection('paquetes')}
            >
                <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
                <ArrowDown className="w-4 h-4 text-white/40" />
            </motion.div>
        </section>
    );
}
