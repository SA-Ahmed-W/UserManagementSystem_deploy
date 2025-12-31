import type { Request, Response } from 'express'
import { updateProfileSchema, changePasswordSchema, paginationSchema } from './user.schema.js'
import { getUserById, updateUserProfile, changeUserPassword, listUsers, setUserStatus } from './user.service.js'
import { sendSuccess, sendError } from '../../utils/response.js'

export const getProfile = async (req: Request, res: Response) => {
    const user = await getUserById(req.user!.userId)

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' })
    }

    return sendSuccess(res, 'Profile fetched', {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        status: user.status
    })
}

export const updateProfile = async (req: Request, res: Response) => {
    const { fullName, email } = updateProfileSchema.parse(req.body)

    const user = await updateUserProfile(req.user!.userId, fullName, email)

    return sendSuccess(res, 'Profile updated', {
        id: user!.id,
        fullName: user!.fullName,
        email: user!.email
    })
}

export const changePassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body)

    await changeUserPassword(req.user!.userId, currentPassword, newPassword)

    return sendSuccess(res, 'Password changed successfully')
}

export const getAllUsers = async (req: Request, res: Response) => {
    const { page, limit } = paginationSchema.parse(req.query)

    const result = await listUsers(page, limit)

    return sendSuccess(res, 'Users fetched', result)
}

export const activateUser = async (req: Request, res: Response) => {
    const id = req.params.id
    if (typeof id === 'undefined') {
        return res.status(400).json({ success: false, message: 'ID is required' })
    }

    const user = await getUserById(id)
    if (!user || user.status === 'active') {
        return res.status(400).json({ success: false, message: 'User is already active' })
    }

    await setUserStatus(id, 'active')
    return sendSuccess(res, 'User activated')
}

export const deactivateUser = async (req: Request, res: Response) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).json({ success: false, message: 'ID is required' })
    }

    const user = await getUserById(id)
    if (!user || user.status === 'inactive') {
        return res.status(400).json({ success: false, message: 'User is already inactive' })
    }

    try {
        await setUserStatus(id, 'inactive')
        return sendSuccess(res, 'User deactivated')
    } catch (err) {
        return sendError(res, (err as Error).message, 400)
    }
}
