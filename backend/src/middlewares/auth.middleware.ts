import type { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.js'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token missing'
        })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication token missing'
        })
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        })
    }
}
