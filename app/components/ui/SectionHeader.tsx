interface SectionHeaderProps {
    title: string;
    subtitle: string;
    className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
    return (
        <div className={`text-center mb-12 ${className}`}>
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-(--text-main) mb-4">
                {title}
            </h2>
            <p className="text-lg text-(--text-secondary) max-w-2xl mx-auto">
                {subtitle}
            </p>
        </div>
    );
}
