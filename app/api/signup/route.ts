import { NextResponse } from 'next/server'

interface SignupPayload {
  email: string
  password: string
  confirm_password: string
}

const RATE_LIMIT = 5
const WINDOW_MS = 60_000

const ipStore = new Map<string, { count: number; start: number }>()

function isAllowed(ip: string): boolean {
    const now = Date.now()
    const record = ipStore.get(ip)

    if (!record || now - record.start > WINDOW_MS) {
        ipStore.set(ip, { count: 1, start: now })
        return true
    }

    if (record.count >= RATE_LIMIT) {
        return false
    }

    record.count++
    return true
}

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/

const PASSWORD_MESSAGE = 'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'

export async function POST(req: Request) {
    try {
        const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0] ??
        req.headers.get('x-real-ip') ??
        'unknown'

        if (!isAllowed(ip)) {
        return NextResponse.json(
            { message: 'Too many attempts. Please try again later.' },
            { status: 429 }
        )
        }

        const { email, password, confirm_password } =
        (await req.json()) as SignupPayload

        if (!email || !password || !confirm_password) {
        return NextResponse.json(
            { message: 'All fields are required.' },
            { status: 400 }
        )
        }

        if (password !== confirm_password) {
        return NextResponse.json(
            { message: 'Passwords do not match.' },
            { status: 400 }
        )
        }

        if (!PASSWORD_REGEX.test(password)) {
        return NextResponse.json(
            { message: PASSWORD_MESSAGE },
            { status: 400 }
        )
        }

        const wpResponse = await fetch(process.env.WP_API_URL as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-fopsco-secret': process.env.FOPSCO_API_SECRET as string,
        },
        body: JSON.stringify({
            email,
            password,
            confirm_password,
        }),
        })

        const data = await wpResponse.json()

        if (!wpResponse.ok) {
        return NextResponse.json(
            { message: data?.message || 'Signup failed.' },
            { status: wpResponse.status }
        )
        }

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json(
        { message: 'Server error.' },
        { status: 500 }
        )
    }
}