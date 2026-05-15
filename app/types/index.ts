export interface Package {
    id: number;
    name: string;
    location: string;
    type: 'Nacional' | 'Internacional';
    category: 'Aventura' | 'Playa' | 'Cultural' | 'Luna de Miel';
    duration: string;
    price: string;
    description: string;
    image: string;
    feature: string;
}

export interface Destination {
    city: string;
    country: string;
    image: string;
}

export interface Review {
    name: string;
    initials: string;
    destination: string;
    rating: number;
    comment: string;
    bgClass: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}
