'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface SignupModalContextType {
    open: () => void
    close: () => void
    isOpen: boolean
}

const SignupModalContext = createContext<SignupModalContextType | null>(null)

export function SignupModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <SignupModalContext.Provider
        value={{
            isOpen,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }}
        >
        {children}
        </SignupModalContext.Provider>
    )
}

export function useSignupModal() {
    const ctx = useContext(SignupModalContext)
    if (!ctx) {
        throw new Error('useSignupModal must be used within SignupModalProvider')
    }
    return ctx
}
