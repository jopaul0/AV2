import { Target, Users, Globe } from 'lucide-react'

export function SobrePage() {
    return (
        <div className="space-y-12 animate-fade-in max-w-3xl mx-auto">
            <div className="text-center space-y-4">
                <h1 className="section-title">Sobre o <span className="text-2xl font-bold text-primary tracking-tight">AEROCODE</span></h1>
                <p className="section-subtitle text-base max-w-xl mx-auto">
                    Uma empresa especializada no desenvolvimento de software para a indústria aeronáutica brasileira e global.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Target, title: 'Nossa missão', desc: 'Desenvolver soluções de software robustas e modernas que tornem a gestão da produção de aeronaves mais eficiente, rastreável e segura.' },
                    { icon: Users, title: 'Nossa equipe', desc: 'Engenheiros de software especializados em sistemas industriais e aeronáuticos, com vasta experiência em projetos de alta complexidade.' },
                    { icon: Globe, title: 'Nossa visão', desc: 'Ser a principal plataforma de gestão de produção aeronáutica do mundo, atendendo desde pequenos fabricantes até gigantes como Boeing e Airbus.' },
                ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="card text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                            <Icon size={20} className="text-primary" />
                        </div>
                        <h2 className="text-base font-semibold text-foreground">{title}</h2>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                ))}
            </div>

            <div className="card space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Nossa história</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    A Aerocode nasceu da necessidade identificada no mercado aeronáutico brasileiro de ter uma solução integrada e acessível para a gestão de produção de aeronaves. Após anos analisando os processos das principais fabricantes do mundo, desenvolvemos um sistema que cobre todo o ciclo de vida da produção: do cadastro inicial até a entrega ao cliente.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Nosso primeiro produto foi um sistema CLI voltado para fabricantes de pequeno porte. Com o sucesso comercial e a adoção em duas fábricas na Ásia e na Europa, evoluímos para uma interface web moderna, tornando o sistema ainda mais acessível e intuitivo para engenheiros, operadores e gestores.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    Hoje miramos grandes empresas como Boeing, Airbus, Embraer, Bombardier, Lockheed Martin, Dassault Aviation, BAE Systems e Gulfstream, oferecendo uma plataforma que combina simplicidade de uso com profundidade de recursos.
                </p>
            </div>

            <div className="card space-y-3">
                <h2 className="text-lg font-semibold text-foreground">Informações da empresa</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div><span className="text-foreground font-medium">Fundação:</span> 2026</div>
                    <div><span className="text-foreground font-medium">Sede:</span> São José dos Campos - SP, Brasil</div>
                    <div><span className="text-foreground font-medium">Setor:</span> Software Aeronáutico</div>
                    <div><span className="text-foreground font-medium">Contato:</span> contato@aerocode.com.br</div>
                </div>
            </div>
        </div>
    )
}