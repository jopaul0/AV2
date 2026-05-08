export function formatDate(value: string | Date | undefined | null): string {
    if (!value) return '—'
    const date = typeof value === 'string' ? new Date(value + 'T00:00:00') : value
    if (isNaN(date.getTime())) return '—'
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}