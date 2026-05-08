import { Link } from 'react-router-dom'

export function Footer() {
    return (
        <footer className="border-t border-border py-8 px-6">
            <div className="mx-auto max-w-screen-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-lg">
                            AEROCODE
                        </div>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Sistema de gestão de produção de aeronaves
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:ml-auto">
                        <Link to="/sobre" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Sobre</Link>
                        <Link to="/api" className="text-xs text-muted-foreground hover:text-foreground transition-colors">API</Link>
                        <Link to="/documentacao" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Documentação</Link>
                        <Link to="/privacidade" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link>
                        <Link to="/suporte" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Suporte</Link>
                    </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                    <p className="text-xs text-muted-foreground text-center sm:text-left">
                        © 2026 – Aerocode | Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}