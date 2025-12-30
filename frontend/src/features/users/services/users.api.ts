import { api } from '@shared/services/api'

export interface UserDTO {
    _id: string
    fullName: string
    email: string
    role: 'admin' | 'user'
    status: 'active' | 'inactive'
}

export interface UsersResponse {
    users: UserDTO[]
    page: number
    totalPages: number
    total: number
}

export const fetchUsers = async (params: { page: number; limit: number; search?: string }) => {
    const res = await api.get<{
        data: UsersResponse
    }>('/users', { params })

    return res.data.data
}

export const activateUser = (id: string) => api.put(`/users/${id}/activate`)

export const deactivateUser = (id: string) => api.put(`/users/${id}/deactivate`)
