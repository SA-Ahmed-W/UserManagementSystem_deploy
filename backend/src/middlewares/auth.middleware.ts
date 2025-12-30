import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.js'
import User from '../models/user.model.js'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined

    const authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]
    } else if (req.cookies?.auth_token) {
        token = req.cookies.auth_token
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token missing'
        })
    }

    try {
        const decoded = verifyToken(token)
        const user = await User.findById(decoded.userId)

        if (!user || user.status !== 'active') {
            return res.status(401).json({
                success: false,
                message: 'User inactive or not found'
            })
        }

        req.user = decoded
        next()
    } catch {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}
