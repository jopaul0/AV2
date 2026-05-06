interface StatCardProps {
    label: string
    value: string | number
    icon?: React.ReactNode
    trend?: string
    className?: string
}

export function StatCard({ label, value, icon, trend, className = '' }: StatCardProps) {
    return (
        <div className={`card flex flex-col gap-2 animate-fade-in ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</span>
                {icon && <span className="text-muted-foreground">{icon}</span>}
            </div>
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {trend && <span className="text-xs text-muted-foreground">{trend}</span>}
        </div>
    )
}