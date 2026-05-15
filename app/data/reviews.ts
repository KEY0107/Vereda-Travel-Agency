import type { Review } from '@/app/types';

export const reviews: Review[] = [
    {
        name: 'María González',
        initials: 'MG',
        destination: 'Tokio y Kioto, Japón',
        rating: 5,
        comment: 'Una experiencia absolutamente mágica. Vereda organizó cada detalle de nuestro viaje a Japón con una precisión impecable. Desde los hoteles boutique hasta las reservaciones en restaurantes tradicionales. ¡Superó todas nuestras expectativas!',
        bgClass: 'bg-gradient-to-br from-[#2D4A3E] to-[#8FA68E]',
    },
    {
        name: 'Carlos y Rebeca Torres',
        initials: 'CT',
        destination: 'Santorini, Grecia',
        rating: 5,
        comment: 'Nuestra luna de miel fue un sueño hecho realidad. Los atardeceres en Oia, la suite con jacuzzi privado, las cenas románticas... todo fue perfecto. Gracias Vereda por hacer que nuestro inicio como matrimonio fuera inolvidable.',
        bgClass: 'bg-gradient-to-br from-blue-700 to-blue-400',
    },
    {
        name: 'Ana Lorena Muñoz',
        initials: 'AM',
        destination: 'Barrancas del Cobre, Chihuahua',
        rating: 4,
        comment: 'El recorrido en El Chepe fue espectacular y las Barrancas aún más impresionantes en persona. La única sugerencia sería más tiempo en cada parada. Definitivamente una joya de México que todos deberían conocer.',
        bgClass: 'bg-gradient-to-br from-amber-600 to-amber-400',
    },
    {
        name: 'Sofía Valdez',
        initials: 'SV',
        destination: 'Marruecos',
        rating: 5,
        comment: 'Marruecos fue una explosión sensorial increíble. Los guías locales que Vereda contrató conocían cada rincón y nos llevaron a lugares que jamás hubiéramos encontrado solos. La noche en el desierto bajo las estrellas quedará grabada para siempre en mi memoria.',
        bgClass: 'bg-gradient-to-br from-purple-700 to-purple-400',
    },
    {
        name: 'Jorge Medina',
        initials: 'JM',
        destination: 'Bacalar, Quintana Roo',
        rating: 5,
        comment: 'Bacalar es el paraíso en la tierra. El agua realmente tiene siete colores y Vereda eligió el hotel perfecto frente a la laguna. El kayak incluido fue un plus increíble. Ideal para desconectarse del mundo y recargar energías.',
        bgClass: 'bg-gradient-to-br from-teal-700 to-teal-400',
    },
    {
        name: 'Laura Portillo',
        initials: 'LP',
        destination: 'Patagonia, Argentina',
        rating: 5,
        comment: 'La Patagonia es para aventureros de corazón y Vereda lo sabe. El trekking sobre el glaciar Perito Moreno fue la experiencia más emocionante de mi vida. Cada día traía una nueva aventura. Organización impecable del principio al fin.',
        bgClass: 'bg-gradient-to-br from-rose-700 to-rose-400',
    },
];
