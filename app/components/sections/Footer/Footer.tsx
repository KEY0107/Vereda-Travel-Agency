import { Compass, Mail, Phone, MapPin, Clock } from 'lucide-react';

const Facebook = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.78-3.88 1.1 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
);

const Instagram = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm0 2h10c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3Zm10.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
    </svg>
);

const Twitter = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.78-6.25L6.6 22H3.5l7.24-8.27L1 2h6.25l4.32 5.71L18.9 2Zm-1.07 18h1.69L6.33 3.9H4.52L17.83 20Z" />
    </svg>
);

const Youtube = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C16 5 12 5 12 5h0s-4 0-6.9.1c-.4 0-1.3.1-2.1.9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5C2 14.4 2.2 16 2.2 16s.2 1.4.8 2c.8.8 1.9.8 2.4.9 1.7.2 6.6.1 6.6.1s4 0 6.9-.1c.4 0 1.3-.1 2.1-.9.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.5C22 9.6 21.8 8 21.8 8ZM10 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
);

const socialIcons = [
    { Icon: Facebook, label: 'Facebook' },
    { Icon: Instagram, label: 'Instagram' },
    { Icon: Twitter, label: 'Twitter / X' },
    { Icon: Youtube, label: 'YouTube' },
];

const footerDestinations = ['México', 'Europa', 'Asia', 'América del Sur', 'Caribe', 'Medio Oriente'];

const footerLinks = [
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Paquetes', id: 'paquetes' },
    { label: 'Testimonios', id: 'opiniones' },
    { label: 'Blog de viajes', id: '' },
    { label: 'Trabaja con nosotros', id: '' },
    { label: 'Aviso de privacidad', id: '' },
];

export function Footer() {
    const scrollTo = (id: string) => {
        if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer id="contacto" className="pt-20 pb-8 bg-[var(--background)] border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Compass className="w-8 h-8 text-[var(--primary)]" />
                            <span className="text-2xl font-bold font-playfair text-[var(--primary)]">Vereda</span>
                        </div>
                        <p className="mb-6 leading-relaxed text-[var(--text-secondary)]">
                            Tu compañero de confianza para explorar el mundo sin límites desde 2013.
                        </p>
                        <div className="flex gap-3">
                            {socialIcons.map(({ Icon, label }) => (
                                <button
                                    key={label}
                                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-[var(--border)] text-[var(--text-main)] hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-white transition-all hover:-translate-y-0.5"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Destinations */}
                    <div>
                        <h3 className="font-semibold text-lg text-[var(--text-main)] mb-4">Destinos</h3>
                        <ul className="space-y-3">
                            {footerDestinations.map((dest) => (
                                <li key={dest}>
                                    <button
                                        onClick={() => scrollTo('destinos')}
                                        className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors hover:underline"
                                    >
                                        {dest}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-lg text-[var(--text-main)] mb-4">Empresa</h3>
                        <ul className="space-y-3">
                            {footerLinks.map(({ label, id }) => (
                                <li key={label}>
                                    <button
                                        onClick={() => scrollTo(id)}
                                        className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors hover:underline"
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg text-[var(--text-main)] mb-4">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[var(--primary)]" />
                                <span className="text-[var(--text-secondary)]">Ciudad Juárez, Chihuahua, México</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 shrink-0 text-[var(--primary)]" />
                                <a href="tel:+526561234567" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors hover:underline">
                                    +52 (656) 123-4567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 shrink-0 text-[var(--primary)]" />
                                <a href="mailto:hola@veredaviajes.mx" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors hover:underline">
                                    hola@veredaviajes.mx
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 mt-0.5 shrink-0 text-[var(--primary)]" />
                                <div className="text-[var(--text-secondary)]">
                                    <div>Lun-Vie 9am–7pm</div>
                                    <div>Sáb 10am–3pm</div>
                                    <div className="text-sm mt-1">WhatsApp disponible 24/7</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-[var(--border)]">
                    <p className="text-[var(--text-secondary)]">© 2025 Vereda. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        {['Privacidad', 'Términos', 'Cookies'].map((t) => (
                            <button key={t} className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors hover:underline">
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
