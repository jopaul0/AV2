export type SortDirection = 'asc' | 'desc'

export interface TableSort {
    field: string
    direction: SortDirection
}

export interface SelectOption {
    label: string
    value: string
}