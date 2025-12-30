import User from '../../models/user.model.js'
import { comparePassword, hashPassword } from '../../utils/password.js'

export const getUserById = async (userId: string) => {
    return User.findById(userId)
}

export const updateUserProfile = async (
    userId: string,
    fullName: string,
    email: string
) => {
    const existing = await User.findOne({ email, _id: { $ne: userId } })
    if (existing) {
        throw new Error('Email already in use')
    }

    return User.findByIdAndUpdate(
        userId,
        { fullName, email },
        { new: true }
    )
}

export const changeUserPassword = async (
    userId: string,
    currentPassword: string,
    newPassword: string
) => {
    const user = await User.findById(userId).select('+password')

    if (!user) {
        throw new Error('User not found')
    }

    const match = await comparePassword(currentPassword, user.password)
    if (!match) {
        throw new Error('Current password is incorrect')
    }

    user.password = await hashPassword(newPassword)
    await user.save()
}

export const listUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
        User.find().skip(skip).limit(limit),
        User.countDocuments()
    ])

    return {
        users,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    }
}

export const setUserStatus = async (userId: string, status: 'active' | 'inactive') => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error('User not found')
    }

    user.status = status
    await user.save()
}
