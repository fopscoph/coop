'use client'
import Modal from "@/components/Modal"
import SignupForm from './SignupForm'
import { useSignupModal } from "@/context/SignupModalContext"

export default function SignupModal() {
    const { isOpen, close } = useSignupModal()

    return (
        <Modal open={isOpen} onClose={close}>
        <h4 className="mb-4 text-lg font-semibold cloud-burst">Register an Account</h4>
        <SignupForm />
        </Modal>
    )
}
