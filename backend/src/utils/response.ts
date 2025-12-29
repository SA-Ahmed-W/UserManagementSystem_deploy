import type { Response } from 'express'

interface ApiResponse<T = unknown> {
    success: boolean
    message: string
    data?: T
}

export const sendSuccess = <T>(res: Response, message: string, data?: T, statusCode = 200) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        ...(data !== undefined && { data })
    }

    return res.status(statusCode).json(response)
}

export const sendError = (res: Response, message: string, statusCode = 400) => {
    return res.status(statusCode).json({
        success: false,
        message
    })
}
