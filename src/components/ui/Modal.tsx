import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
    open: boolean
    onClose: () => void
    title: string
    children: ReactNode
    size?: 'sm' | 'md' | 'lg'
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [onClose])

    if (!open) return null

    const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={onClose}
        >
            <div
                className={`w-full ${widths[size]} bg-card border border-border rounded-lg shadow-2xl animate-fade-in`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <h2 className="text-base font-semibold text-foreground">{title}</h2>
                    <button onClick={onClose} className="btn-ghost p-1 rounded-md">
                        <X size={16} />
                    </button>
                </div>
                {/* Body */}
                <div className="px-5 py-4">
                    {children}
                </div>
            </div>
        </div>
    )
}