import { Plane } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-border py-6 px-6">
            <div className="mx-auto max-w-screen-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Plane size={16} />
                    AEROCODE
                </div>
                <p className="text-xs text-muted-foreground">
                    © 2026 – Aerocode | Todos os direitos reservados.
                </p>
                <div className="flex gap-6 text-xs text-muted-foreground">
                    <a href="#" className="hover:text-foreground transition-colors">Sobre</a>
                    <a href="#" className="hover:text-foreground transition-colors">Documentação</a>
                    <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
                    <a href="#" className="hover:text-foreground transition-colors">API</a>
                    <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
                </div>
            </div>
        </footer>
    )
}