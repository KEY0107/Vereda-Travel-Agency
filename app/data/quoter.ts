export interface Destination {
    id: string;
    label: string;
    basePricePerPersonPerDay: number;
    region: string;
}

export interface ServiceTier {
    id: 'basic' | 'standard' | 'premium';
    label: string;
    description: string;
    multiplier: number;
}

export interface ExtraService {
    id: string;
    label: string;
    description: string;
    pricePerPerson: number;
}

export const destinations: Destination[] = [
    { id: 'cancun', label: 'Cancún, México', basePricePerPersonPerDay: 3_200, region: 'México' },
    { id: 'cdmx', label: 'Ciudad de México', basePricePerPersonPerDay: 2_100, region: 'México' },
    { id: 'paris', label: 'París, Francia', basePricePerPersonPerDay: 5_800, region: 'Europa' },
    { id: 'roma', label: 'Roma, Italia', basePricePerPersonPerDay: 5_200, region: 'Europa' },
    { id: 'barcelona', label: 'Barcelona, España', basePricePerPersonPerDay: 4_900, region: 'Europa' },
    { id: 'tokyo', label: 'Tokio, Japón', basePricePerPersonPerDay: 6_800, region: 'Asia' },
    { id: 'bangkok', label: 'Bangkok, Tailandia', basePricePerPersonPerDay: 3_700, region: 'Asia' },
    { id: 'bali', label: 'Bali, Indonesia', basePricePerPersonPerDay: 3_400, region: 'Asia' },
    { id: 'buenos-aires', label: 'Buenos Aires, Argentina', basePricePerPersonPerDay: 2_900, region: 'América del Sur' },
    { id: 'machu-picchu', label: 'Machu Picchu, Perú', basePricePerPersonPerDay: 3_900, region: 'América del Sur' },
    { id: 'punta-cana', label: 'Punta Cana, R. Dominicana', basePricePerPersonPerDay: 4_400, region: 'Caribe' },
    { id: 'dubai', label: 'Dubái, EAU', basePricePerPersonPerDay: 7_600, region: 'Medio Oriente' },
];

export const serviceTiers: ServiceTier[] = [
    {
        id: 'basic',
        label: 'Básico',
        description: 'Vuelo + hospedaje estándar',
        multiplier: 1.0,
    },
    {
        id: 'standard',
        label: 'Estándar',
        description: 'Vuelo + hospedaje 4★ + desayuno',
        multiplier: 1.4,
    },
    {
        id: 'premium',
        label: 'Premium',
        description: 'Vuelo business + hotel 5★ + todo incluido',
        multiplier: 2.1,
    },
];

export const extraServices: ExtraService[] = [
    {
        id: 'transfer',
        label: 'Traslado aeropuerto',
        description: 'Ida y vuelta desde/hacia el aeropuerto',
        pricePerPerson: 800,
    },
    {
        id: 'insurance',
        label: 'Seguro de viaje',
        description: 'Cobertura médica y de equipaje completa',
        pricePerPerson: 1_200,
    },
    {
        id: 'tours',
        label: 'Tours guiados',
        description: 'Recorridos con guía local certificado',
        pricePerPerson: 2_000,
    },
    {
        id: 'lodging-upgrade',
        label: 'Upgrade de hospedaje',
        description: 'Habitación superior o suite',
        pricePerPerson: 3_200,
    },
    {
        id: 'advisory',
        label: 'Asesoría personalizada',
        description: 'Planificación completa a medida',
        pricePerPerson: 1_500,
    },
];

export interface QuoteSummary {
    destinationId: string;
    destinationLabel: string;
    people: number;
    days: number;
    tierId: string;
    tierLabel: string;
    extraServiceIds: string[];
    totalPrice: number;
    pricePerPerson: number;
    savedAt: number;
}

export const QUOTE_STORAGE_KEY = 'vereda_quote';

export function calculatePrice(
    destination: Destination,
    people: number,
    days: number,
    tier: ServiceTier,
    extras: ExtraService[]
): { total: number; perPerson: number; breakdown: { label: string; amount: number }[] } {
    const base = destination.basePricePerPersonPerDay * people * days;
    const tiered = Math.round(base * tier.multiplier);
    const extrasTotal = extras.reduce((sum, e) => sum + e.pricePerPerson * people, 0);
    const total = tiered + extrasTotal;
    const perPerson = Math.round(total / people);

    const breakdown: { label: string; amount: number }[] = [
        { label: `${tier.label} (${days} noches × ${people} personas)`, amount: tiered },
        ...extras.map((e) => ({ label: e.label, amount: e.pricePerPerson * people })),
    ];

    return { total, perPerson, breakdown };
}
