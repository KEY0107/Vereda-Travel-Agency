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
        <section id="nosotros" className="py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left — text */}
                    <motion.div
                        initial={{ opacity: 0, x: -32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.75, ease: EASE }}
                    >
                        <motion.p
                            className="text-xs uppercase tracking-widest font-semibold text-(--primary) mb-4"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
                        >
                            Por qué elegirnos
                        </motion.p>

                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-(--text-main) mb-6 leading-tight">
                            La agencia que <br />
                            <span className="text-(--primary)">transforma sueños</span>
                        </h2>

                        <div className="space-y-4 mb-10">
                            <p className="text-base leading-relaxed text-(--text-secondary)">
                                Fundada en Ciudad Juárez, Chihuahua, Vereda nació de la pasión por conectar
                                a las personas con el mundo. Desde 2013, hemos transformado sueños de viaje
                                en experiencias reales que cambian vidas.
                            </p>
                            <p className="text-base leading-relaxed text-(--text-secondary)">
                                No somos solo una agencia de viajes. Somos un equipo de exploradores,
                                curadores de experiencias y diseñadores de momentos inolvidables.
                                Tu mundo, sin límites, es nuestra promesa.
                            </p>
                        </div>

                        {/* Feature grid */}
                        <div className="grid grid-cols-2 gap-5">
                            {features.map((f, i) => {
                                const Icon = f.icon;
                                return (
                                    <motion.div
                                        key={f.title}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, ease: EASE, delay: 0.25 + i * 0.07 }}
                                        className="flex gap-3 p-4 rounded-2xl border border-border bg-surface hover:border-(--primary)/30 transition-colors duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-(--primary)/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-(--primary)" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-sm text-(--text-main) mb-0.5 leading-snug">{f.title}</h3>
                                            <p className="text-xs leading-relaxed text-(--text-secondary)">{f.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Right — image collage (two independent flex columns) */}
                    <motion.div
                        className="flex gap-3"
                        initial={{ opacity: 0, x: 32 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                    >
                        {/* Column A: images 0 and 2 */}
                        <div className="flex flex-col gap-3 flex-1">
                            {[images[0], images[2]].map((src, i) => (
                                <motion.div
                                    key={i}
                                    className="relative overflow-hidden rounded-2xl group"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                >
                                    <img
                                        src={src}
                                        alt={`Equipo Vereda ${i * 2 + 1}`}
                                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-102"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Column B: images 1 and 3, offset downward */}
                        <div className="flex flex-col gap-3 flex-1 mt-10">
                            {[images[1], images[3]].map((src, i) => (
                                <motion.div
                                    key={i}
                                    className="relative overflow-hidden rounded-2xl group"
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                >
                                    <img
                                        src={src}
                                        alt={`Equipo Vereda ${i * 2 + 2}`}
                                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-102"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
