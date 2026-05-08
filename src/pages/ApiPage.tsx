import { Code2, Wrench, AlertTriangle } from 'lucide-react'

export function ApiPage() {
    return (
        <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
            <div className="space-y-2">
                <h1 className="section-title">API</h1>
                <p className="section-subtitle">Integre seus sistemas com a plataforma Aerocode.</p>
            </div>

            {/* Status banner */}
            <div className="flex items-center gap-3 bg-warning/10 border border-warning/30 rounded-lg px-4 py-4">
                <AlertTriangle size={20} className="text-warning shrink-0" />
                <div>
                    <p className="text-sm font-semibold text-foreground">API em desenvolvimento (AV3)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        A API REST do Aerocode está atualmente em fase de desenvolvimento. Previsão de lançamento: <strong className="text-foreground">05/06/2026</strong>.
                    </p>
                </div>
            </div>

            {/* O que está por vir */}
            <div className="card space-y-4">
                <div className="flex items-center gap-2">
                    <Code2 size={18} className="text-primary" />
                    <h2 className="text-base font-semibold text-foreground">O que está previsto</h2>
                </div>
                <div className="space-y-3">
                    {[
                        { endpoint: 'GET /api/v1/aeronaves', desc: 'Listar todas as aeronaves com filtros por tipo e status.' },
                        { endpoint: 'POST /api/v1/aeronaves', desc: 'Cadastrar uma nova aeronave.' },
                        { endpoint: 'GET /api/v1/aeronaves/:codigo', desc: 'Buscar uma aeronave específica com peças, etapas e testes.' },
                        { endpoint: 'PATCH /api/v1/etapas/:id/avancar', desc: 'Avançar o status de uma etapa de produção.' },
                        { endpoint: 'POST /api/v1/testes', desc: 'Registrar um novo resultado de teste.' },
                        { endpoint: 'GET /api/v1/relatorios/:codigo', desc: 'Gerar relatório completo de entrega de uma aeronave.' },
                        { endpoint: 'POST /api/v1/auth/login', desc: 'Autenticar usuário e obter token JWT.' },
                    ].map(({ endpoint, desc }) => (
                        <div key={endpoint} className="flex gap-3 py-2 border-b border-border last:border-0">
                            <code className="text-xs text-primary font-mono bg-primary/5 px-2 py-0.5 rounded shrink-0 self-start mt-0.5">{endpoint}</code>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Autenticação prevista */}
            <div className="card space-y-3">
                <div className="flex items-center gap-2">
                    <Wrench size={16} className="text-primary" />
                    <h2 className="text-base font-semibold text-foreground">Autenticação prevista</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    A API utilizará autenticação via <strong className="text-foreground">JWT (JSON Web Token)</strong>. 
                    Todas as rotas protegidas exigirão o header:
                </p>
                <pre className="bg-muted rounded-md p-3 text-xs font-mono text-foreground overflow-x-auto">
                    Authorization: Bearer &lt;seu_token&gt;
                </pre>
            </div>

            <div className="text-center text-sm text-muted-foreground">
                Quer ser avisado quando a API for lançada?{' '}
                <a href="/suporte" className="text-primary hover:underline">Entre em contato conosco.</a>
            </div>
        </div>
    )
}