import { useState } from 'react'
import { signupSchema } from '../schemas/auth.schema'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function SignupPage() {
    const { signup, loading } = useAuth()

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const parsed = signupSchema.safeParse(form)
        if (!parsed.success) {
            parsed.error.issues.forEach((i) => {
                toast.error(i.message)
            })
            return
        }

        await signup(parsed.data)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Signup</h2>

            <input
                placeholder="Full name"
                className="input"
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />

            <input
                placeholder="Email"
                className="input"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                className="input"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
                disabled={loading}
                className="btn">
                {loading ? 'Loading...' : 'Signup'}
            </button>
        </form>
    )
}
