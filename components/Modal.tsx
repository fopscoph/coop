'use client'
import { ReactNode, useEffect, useState } from 'react'

interface ModalProps {
    open: boolean
    onClose: () => void
    children: ReactNode
}

export default function Modal({ open, onClose, children }: ModalProps) {
    const [mounted, setMounted] = useState(open)

    useEffect(() => {
        if (open) {
            setMounted(true)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
            const timer = setTimeout(() => setMounted(false), 200)
            return () => clearTimeout(timer)
        }
    }, [open])

    if (!mounted) return null

    return (
        <div
        onClick={onClose}
        className={`
            fixed inset-0 z-50 flex items-center justify-center
            bg-[#182955]/90
            transition-opacity duration-200 ease-out
            ${open ? 'opacity-100' : 'opacity-0'}
        `}
        >
            <div onClick={(e) => e.stopPropagation()} className={`relative w-full max-w-md rounded-lg bg-white p-6 transform transition-all duration-200 ease-out ${open ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>
                <button onClick={onClose} className="absolute right-3 top-3 text-gray-500 cursor-pointer">✕</button>
                {children}
            </div>
        </div>
    )
}
