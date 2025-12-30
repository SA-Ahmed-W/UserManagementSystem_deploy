import { z } from 'zod'

export const updateProfileSchema = z.object({
    fullName: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address')
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters')
})

export const paginationSchema = z.object({
    page: z
        .string()
        .optional()
        .transform(val => Number(val) || 1),
    limit: z
        .string()
        .optional()
        .transform(val => Number(val) || 10)
})