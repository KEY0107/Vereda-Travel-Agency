"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@heroui/react';
import styles from './Navbar.module.css';

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const navLinks = ['Paquetes', 'Destinos', 'Nosotros', 'Opiniones', 'FAQ', 'Contacto'];

const iconBtnClass =
    'w-[2.375rem] h-[2.375rem] min-w-[2.375rem] rounded-full border border-[var(--border)] bg-transparent text-[var(--text-main)] hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors';

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pillRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (section: string) => {
        document.getElementById(section.toLowerCase())
            ?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        const pill = pillRef.current;
        if (!pill) return;

        const tween = gsap.to(pill, {
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            ease: 'none',
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: '200px top',
                scrub: 0.6,
            },
        });

        return () => { tween.scrollTrigger?.kill(); };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-4 left-4 right-4 z-50 flex justify-center"
                initial={{ y: -90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
                <div
                    ref={pillRef}
                    className="w-full max-w-7xl flex items-center justify-between px-7 py-3.5 rounded-full bg-(--surface)/80 backdrop-blur-xl border border-(--border)/50 shadow-lg shadow-black/10"
                >
                    <button
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        aria-label="Ir al inicio"
                    >
                        <Compass className="w-5 h-5 text-(--primary)" />
                        <span className="text-xl md:text-2xl font-bold text-(--primary) font-playfair">
                            Vereda
                        </span>
                    </button>

                    <nav className="hidden lg:flex items-center gap-7" aria-label="Navegación principal">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link}
                                className={styles.navLink}
                                onClick={() => scrollToSection(link)}
                                whileHover={{ y: -1 }}
                                transition={{ duration: 0.15 }}
                            >
                                {link}
                            </motion.button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2.5">
                        <Button
                            className="hidden sm:inline-flex bg-(--primary) text-white font-semibold text-sm px-5 h-9.5 rounded-full hover:bg-(--primary-hover) transition-colors"
                            onPress={() => scrollToSection('contacto')}
                        >
                            Cotizar Viaje
                        </Button>

                        <Button
                            isIconOnly
                            className={iconBtnClass}
                            onPress={toggleDarkMode}
                            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={darkMode ? 'sun' : 'moon'}
                                    className="flex"
                                    initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </motion.span>
                            </AnimatePresence>
                        </Button>

                        <Button
                            isIconOnly
                            className={`lg:hidden ${iconBtnClass}`}
                            onPress={() => setMobileMenuOpen((v) => !v)}
                            aria-label="Abrir menú"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={mobileMenuOpen ? 'close' : 'menu'}
                                    className="flex"
                                    initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                </motion.span>
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="fixed top-21 left-4 right-4 z-49 bg-(--surface)/95 backdrop-blur-xl rounded-3xl border border-(--border)/50 shadow-2xl shadow-black/20 p-4 flex flex-col gap-0.5"
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link}
                                className="text-base font-medium text-(--text-main) px-4 py-3 text-left rounded-xl hover:bg-(--primary)/10 hover:text-(--primary) transition-colors w-full"
                                onClick={() => scrollToSection(link)}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.045, duration: 0.2 }}
                            >
                                {link}
                            </motion.button>
                        ))}

                        <div className="h-px bg-(--border)/50 my-2" />

                        <Button
                            className="bg-(--primary) text-white font-semibold text-base h-12 rounded-full hover:bg-(--primary-hover) transition-colors w-full"
                            onPress={() => scrollToSection('contacto')}
                            fullWidth
                        >
                            Cotizar Viaje
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
