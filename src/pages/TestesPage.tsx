import { useAeronaves } from '../hooks/useAeronaves'
import { ResultadoBadge } from '../components/ui/Badge'
import { Link } from 'react-router-dom'

export function TestesPage() {
    const { aeronaves } = useAeronaves()

    const allTestes = aeronaves.flatMap(a =>
        a.testes.map(t => ({ ...t, aeronave: a }))
    )

    const aprovados = allTestes.filter(t => t.resultado === 'APROVADO').length
    const reprovados = allTestes.filter(t => t.resultado === 'REPROVADO').length

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="section-title">Testes</h1>
                <p className="section-subtitle mt-1">{allTestes.length} testes registrados · {aprovados} aprovados · {reprovados} reprovados</p>
            </div>

            <div className="card p-0 overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-border">
                        <tr>
                            {['Aeronave', 'Tipo', 'Resultado', 'Data'].map(h => (
                                <th key={h} className="table-header text-left py-3 px-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {allTestes.length === 0 ? (
                            <tr><td colSpan={4} className="table-cell text-center text-muted-foreground py-10">Nenhum teste registrado.</td></tr>
                        ) : allTestes.map(t => (
                            <tr key={`${t.aeronave.codigo}-${t.id}`} className="table-row">
                                <td className="table-cell">
                                    <Link to={`/aeronaves/${t.aeronave.codigo}`} className="text-primary hover:underline font-medium">
                                        {t.aeronave.codigo}
                                    </Link>
                                    <span className="text-xs text-muted-foreground ml-2">{t.aeronave.modelo}</span>
                                </td>
                                <td className="table-cell">{t.tipo}</td>
                                <td className="table-cell"><ResultadoBadge resultado={t.resultado} /></td>
                                <td className="table-cell text-xs text-muted-foreground">{t.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}