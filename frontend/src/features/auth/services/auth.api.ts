import { api } from '@shared/services/api'
import type { LoginInput, SignupInput } from '../schemas/auth.schema'

export const authApi = {
    signup: (data: SignupInput) =>
        api.post('/auth/signup', data),

    login: (data: LoginInput) =>
        api.post('/auth/login', data),

    logout: () =>
        api.post('/auth/logout'),

    me: () =>
        api.get('/users/me')
}
