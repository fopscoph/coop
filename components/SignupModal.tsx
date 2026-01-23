'use client'
import { useState, useEffect } from 'react'
import Modal from "@/components/Modal"
import SignupForm from './SignupForm'
import { useSignupModal } from "@/context/SignupModalContext"

export default function SignupModal() {
    const { isOpen, close } = useSignupModal()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!isOpen) {
            setSuccess(false)
        }
    }, [isOpen])

    return (
        <Modal open={isOpen} onClose={close}>
            {!success && (
                <h4 className="mb-4 text-lg font-semibold cloud-burst">
                    Register an Account
                </h4>
            )}

            <SignupForm onSuccess={() => setSuccess(true)} />
        </Modal>
    )
}