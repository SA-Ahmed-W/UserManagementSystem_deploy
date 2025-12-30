import { useEffect, useState } from 'react'
import { authApi } from '../services/auth.api'

export interface AuthUser {
    id: string
    fullName: string
    email: string
    role: 'admin' | 'user'
    status: 'active' | 'inactive'
}

export const useAuthSession = () => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchMe = async () => {
        try {
            const res = await authApi.me()
            setUser(res.data.data)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMe()
    }, [])

    return {
        user,
        loading,
        isAuthenticated: !!user,
        refresh: fetchMe
    }
}
