"use client";

import { useDarkMode } from '@/app/hooks/useDarkMode';
import { Navbar } from '@/app/components/sections/Navbar/Navbar';
import { Hero } from '@/app/components/sections/Hero/Hero';
import { SearchBar } from '@/app/components/sections/SearchBar/SearchBar';
import { Packages } from '@/app/components/sections/Packages/Packages';
import { DestinationsCarousel } from '@/app/components/sections/Carousel/DestinationsCarousel';
import { FAQ } from '@/app/components/sections/FAQ/FAQ';
import { Reviews } from '@/app/components/sections/Reviews/Reviews';
import { About } from '@/app/components/sections/About/About';
import { Quoter } from '@/app/components/sections/Quoter/Quoter';
import { Contact } from '@/app/components/sections/Contact/Contact';
import { Footer } from '@/app/components/sections/Footer/Footer';

export default function Home() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className="min-h-screen bg-background">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <main>
                <Hero />
                <SearchBar />
                <Packages />
                <DestinationsCarousel />
                <FAQ />
                <Reviews />
                <About />
                <Quoter />
                <Contact />
                <Footer />
            </main>
        </div>
    );
}
