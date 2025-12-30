import { useState } from 'react'
import { toast } from 'react-toastify'
import { authApi } from '../services/auth.api'
import type { LoginInput, SignupInput } from '../schemas/auth.schema'

export const useAuth = () => {
    const [loading, setLoading] = useState(false)

    const signup = async (data: SignupInput) => {
        try {
            setLoading(true)
            await authApi.signup(data)
            toast.success('Signup successful')
        } catch (err: unknown) {
            toast.error(err?.response?.data?.message || 'Signup failed')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const login = async (data: LoginInput) => {
        try {
            setLoading(true)
            await authApi.login(data)
            toast.success('Login successful')
        } catch (err: unknown) {
            toast.error(err?.response?.data?.message || 'Login failed')
            throw err
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
            toast.info('Logged out')
        } catch {
            toast.error('Logout failed')
        }
    }

    return {
        signup,
        login,
        logout,
        loading
    }
}
