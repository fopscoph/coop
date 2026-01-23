'use client'
import { ChangeEvent, FormEvent, useState } from 'react'

interface SignupFormProps {
    onSuccess: () => void
}

interface FormState {
    email: string
    password: string
    confirm_password: string
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
    const [form, setForm] = useState<FormState>({
        email: '',
        password: '',
        confirm_password: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        const data = await res.json()
        setLoading(false)

        if (!res.ok) {
            setError(data.message)
            return
        }

        setSuccess(true)
        onSuccess()
    }

    if (success) {
        return (
            <p className="text-center text-green-600">
                Thanks for your interest! We’ve sent you an email, please check your inbox to complete your registration.
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            <input
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            <details className="text-sm text-gray-600">
                <summary className="flex text-sm cursor-pointer items-center gap-1 list-none text-gray-500">
                    <span className="text-xs leading-none font-semibold">ⓘ</span>
                    <span className="text-xs">Learn more about password and data requirements</span>
                </summary>

                <div className="mt-2 space-y-3 rounded-md border border-gray-200 bg-gray-50 p-3 text-gray-700">
                    <div>
                        <p className="text-xs font-medium">Why we require a complex password</p>
                        <p className="text-xs">
                            Fopsco is built following security-by-design principles. Requiring a complex password
                            helps safeguard user accounts against unauthorized access, including brute-force
                            attempts and credential misuse.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium">Why we only collect email and password</p>
                        <p className="text-xs">
                            To support data minimization and user privacy, we collect only essential information
                            during initial registration. Additional information may be requested later as needed.
                        </p>
                    </div>
                </div>
            </details>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
                disabled={loading}
                className="bg-bright-orange hover:bg-[#182955] text-white text-md transition-colors duration-300 ease-in-out py-3 px-7 rounded-lg font-semibold w-full tracking-wider"
            >
                {loading ? 'Creating account…' : 'Create account'}
            </button>
        </form>
    )
}