import { useState } from 'react'
import { loginSchema } from '../schemas/auth.schema'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

export default function LoginPage() {
    const { login, loading } = useAuth()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const parsed = loginSchema.safeParse(form)
        if (!parsed.success) {
            parsed.error.issues.forEach((i) => {
                toast.error(i.message)
            })
            return
        }

        await login(parsed.data)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold">Login</h2>

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
                {loading ? 'Loading...' : 'Login'}
            </button>
        </form>
    )
}
