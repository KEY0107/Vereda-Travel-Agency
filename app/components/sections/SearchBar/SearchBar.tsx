"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Compass, Clock, Calendar } from 'lucide-react';
import { SelectField } from '@/app/components/ui/SelectField';
import { DatePickerField } from '@/app/components/ui/DatePickerField';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tabs = ['Paquetes', 'Hoteles', 'Personalizado'] as const;
type Tab = typeof tabs[number];

type FieldDef = {
    label: string;
    icon: typeof MapPin;
    type: 'select' | 'date';
    options?: string[];
};

const fieldsByTab: Record<Tab, FieldDef[]> = {
    Paquetes: [
        { label: 'Destino', icon: MapPin, type: 'select', options: ['Todos los destinos', 'México', 'Europa', 'Asia', 'América del Sur', 'Caribe', 'Medio Oriente'] },
        { label: 'Tipo de viaje', icon: Compass, type: 'select', options: ['Todos los tipos', 'Aventura', 'Playa', 'Cultural', 'Luna de Miel', 'Familiar'] },
        { label: 'Duración', icon: Clock, type: 'select', options: ['Cualquier duración', '1 - 3 días', '4 - 7 días', '8 - 14 días', '15+ días'] },
        { label: 'Fecha de salida', icon: Calendar, type: 'date' },
    ],
    Hoteles: [
        { label: 'Ciudad o destino', icon: MapPin, type: 'select', options: ['Cualquier ciudad', 'Cancún', 'Ciudad de México', 'París', 'Tokio', 'Dubai', 'Roma'] },
        { label: 'Tipo de hotel', icon: Compass, type: 'select', options: ['Cualquier tipo', 'Resort', 'Boutique', 'Business', 'Familiar'] },
        { label: 'Check-in', icon: Calendar, type: 'date' },
        { label: 'Check-out', icon: Calendar, type: 'date' },
    ],
    Personalizado: [
        { label: 'Origen', icon: MapPin, type: 'select', options: ['Ciudad Juárez', 'Ciudad de México', 'Monterrey', 'Guadalajara', 'Tijuana'] },
        { label: 'Destino', icon: Compass, type: 'select', options: ['Me sorprendan', 'Europa', 'Asia', 'América', 'Caribe', 'Medio Oriente'] },
        { label: 'Presupuesto', icon: Clock, type: 'select', options: ['Cualquier presupuesto', 'Hasta $15,000', '$15K - $30K', '$30K - $60K', '$60K+'] },
        { label: 'Fecha', icon: Calendar, type: 'date' },
    ],
};

export function SearchBar() {
    const [activeTab, setActiveTab] = useState<Tab>('Paquetes');

    return (
        <motion.div
            className="relative z-20 -mt-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
            <div className="rounded-2xl bg-(--surface)/95 backdrop-blur-xl border border-(--border)/60 shadow-2xl shadow-black/20 overflow-hidden">

                {/* Tabs */}
                <div className="flex gap-1 px-6 pt-5 pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-5 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeTab === tab
                                ? 'text-(--primary)'
                                : 'text-(--text-secondary) hover:text-(--text-main)'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="tab-indicator"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--primary) rounded-full"
                                    transition={{ duration: 0.25, ease: EASE }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="h-px bg-(--border)/50 mx-6" />

                {/* Fields */}
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: EASE }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                        >
                            {fieldsByTab[activeTab].map(({ label, icon: Icon, type, options }) => (
                                <div key={label} className="flex flex-col gap-1.5">
                                    <span className="flex items-center gap-1.5 text-xs font-semibold text-(--text-secondary) uppercase tracking-wider">
                                        <Icon className="w-3.5 h-3.5 text-(--primary)" />
                                        {label}
                                    </span>
                                    {type === 'select'
                                        ? <SelectField label={label} options={options!} />
                                        : <DatePickerField label={label} />
                                    }
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Search button */}
                    <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
                        <p className="text-xs text-(--text-secondary)">
                            Resultados en segundos · Sin costo de asesoría
                        </p>
                        <motion.button
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-white font-semibold bg-(--primary) hover:bg-(--primary-hover) transition-colors shadow-lg shadow-(--primary)/25"
                            whileHover={{ scale: 1.03, y: -1 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Search className="w-3 h-3" />
                            Buscar Viajes
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
