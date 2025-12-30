import { z } from 'zod'

export const signupSchema = z.object({
    fullName: z.string().min(3, 'Full name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 chars')
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password is required')
})

export type SignupInput = z.infer<typeof signupSchema>
export type LoginInput = z.infer<typeof loginSchema>
