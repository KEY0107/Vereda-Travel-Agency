"use client";

import { motion } from 'framer-motion';
import { Award, Globe, Heart, Users } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const features = [
    {
        icon: Award,
        title: '15 Años de Experiencia',
        description: 'Más de una década conectando viajeros con sus destinos soñados',
    },
    {
        icon: Users,
        title: 'Atención Personalizada',
        description: 'Asesores expertos dedicados a crear tu viaje perfecto',
    },
    {
        icon: Globe,
        title: '120 Destinos',
        description: 'Presencia global con alianzas en los mejores destinos del mundo',
    },
    {
        icon: Heart,
        title: 'Pasión por Viajar',
        description: 'Equipo de viajeros apasionados que conocen cada destino de primera mano',
    },
];

const images = [
    'https://images.unsplash.com/photo-1714976326964-5dc66a257d93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBhZ2VuY3klMjBvZmZpY2UlMjBoYXBweSUyMHBlb3BsZSUyMHBsYW5uaW5nJTIwdmFjYXRpb258ZW58MXx8fHwxNzc4ODI0NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1714976327083-02de0b9a42b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0cmF2ZWwlMjBhZ2VuY3klMjBvZmZpY2UlMjBoYXBweSUyMHBlb3BsZSUyMHBsYW5uaW5nJTIwdmFjYXRpb258ZW58MXx8fHwxNzc4ODI0NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1714976326931-d9b9133fa3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx0cmF2ZWwlMjBhZ2VuY3klMjBvZmZpY2UlMjBoYXBweSUyMHBlb3BsZSUyMHBsYW5uaW5nJTIwdmFjYXRpb258ZW58MXx8fHwxNzc4ODI0NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1714976326958-595d675314d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx0cmF2ZWwlMjBhZ2VuY3klMjBvZmZpY2UlMjBoYXBweSUyMHBlb3BsZSUyMHBsYW5uaW5nJTIwdmFjYXRpb258ZW58MXx8fHwxNzc4ODI0NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function About() {
    return (
        <section id="nosotros" className="py-32 bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-start">

                    {/* Left */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE }}
                    >
                        <div>
                            <motion.div
                                className="text-sm uppercase tracking-widest text-[var(--primary)] mb-4 font-semibold"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                Por qué elegirnos
                            </motion.div>
                            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-[var(--text-main)] mb-8">
                                Por qué elegir Vereda
                            </h2>
                            <div className="space-y-6">
                                <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                                    Fundada en Ciudad Juárez, Chihuahua, Vereda nació de la pasión por conectar
                                    a las personas con el mundo. Desde 2013, hemos transformado sueños de viaje
                                    en experiencias reales que cambian vidas.
                                </p>
                                <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                                    No somos solo una agencia de viajes. Somos un equipo de exploradores,
                                    curadores de experiencias y diseñadores de momentos inolvidables. Tu mundo,
                                    sin límites, es nuestra promesa.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-8">
                            {features.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <motion.div
                                        key={f.title}
                                        className="space-y-3"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                                    >
                                        <motion.div
                                            className="w-14 h-14 rounded-xl flex items-center justify-center bg-[var(--primary)]/10"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Icon className="w-7 h-7 text-[var(--primary)]" />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold text-[var(--text-main)] mb-2">{f.title}</h3>
                                            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{f.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right — image grid */}
                    <motion.div
                        className="grid grid-cols-2 gap-4"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                    >
                        {images.map((src, i) => (
                            <motion.img
                                key={i}
                                src={src}
                                alt={`Equipo Vereda ${i + 1}`}
                                className={`rounded-xl object-cover w-full ${i % 2 === 1 ? 'h-[280px] mt-8' : 'h-[250px]'}`}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
