import { StatusPeca } from '../../types/enums/StatusPeca'
import { StatusEtapa } from '../../types/enums/StatusEtapa'
import { ResultadoTeste } from '../../types/enums/ResultadoTeste'
import { NivelPermissao } from '../../types/enums/NivelPermissao'
import { TipoAeronave } from '../../types/enums/TipoAeronave'

type BadgeVariant = 'success' | 'warning' | 'primary' | 'muted' | 'danger'

interface BadgeProps {
    variant?: BadgeVariant
    children: React.ReactNode
    className?: string
}

export function Badge({ variant = 'muted', children, className = '' }: BadgeProps) {
    const classes: Record<BadgeVariant, string> = {
        success: 'badge-success',
        warning: 'badge-warning',
        primary: 'badge-primary',
        muted: 'badge-muted',
        danger: 'badge-danger',
    }
    return <span className={`badge ${classes[variant]} ${className}`}>{children}</span>
}


export function StatusPecaBadge({ status }: { status: StatusPeca }) {
    const map: Record<StatusPeca, { label: string; variant: BadgeVariant }> = {
        [StatusPeca.PRONTA]: { label: 'Pronta', variant: 'success' },
        [StatusPeca.EM_TRANSPORTE]: { label: 'Em transporte', variant: 'warning' },
        [StatusPeca.EM_PRODUCAO]: { label: 'Em produção', variant: 'primary' },
    }
    const { label, variant } = map[status]
    return <Badge variant={variant}>{label}</Badge>
}

export function StatusEtapaBadge({ status }: { status: StatusEtapa }) {
    const map: Record<StatusEtapa, { label: string; variant: BadgeVariant }> = {
        [StatusEtapa.CONCLUIDA]: { label: 'Concluída', variant: 'success' },
        [StatusEtapa.ANDAMENTO]: { label: 'Em andamento', variant: 'warning' },
        [StatusEtapa.PENDENTE]: { label: 'Pendente', variant: 'muted' },
    }
    const { label, variant } = map[status]
    return <Badge variant={variant}>{label}</Badge>
}

export function ResultadoBadge({ resultado }: { resultado: ResultadoTeste }) {
    return resultado === ResultadoTeste.APROVADO
        ? <Badge variant="success">Aprovado</Badge>
        : <Badge variant="danger">Reprovado</Badge>
}

export function NivelBadge({ nivel }: { nivel: NivelPermissao }) {
    const map: Record<NivelPermissao, { label: string; variant: BadgeVariant }> = {
        [NivelPermissao.ADMINISTRADOR]: { label: 'Admin', variant: 'primary' },
        [NivelPermissao.ENGENHEIRO]: { label: 'Engenheiro', variant: 'warning' },
        [NivelPermissao.OPERADOR]: { label: 'Operador', variant: 'muted' },
    }
    const { label, variant } = map[nivel]
    return <Badge variant={variant}>{label}</Badge>
}

export function TipoAeronaveBadge({ tipo }: { tipo: TipoAeronave }) {
    return tipo === TipoAeronave.MILITAR
        ? <Badge variant="danger">Militar</Badge>
        : <Badge variant="primary">Comercial</Badge>
}