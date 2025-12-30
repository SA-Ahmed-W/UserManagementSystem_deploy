import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { loadEnv } from '../config/env.js'

type Unit =
    | 'Years'
    | 'Year'
    | 'Yrs'
    | 'Yr'
    | 'Y'
    | 'Weeks'
    | 'Week'
    | 'W'
    | 'Days'
    | 'Day'
    | 'D'
    | 'Hours'
    | 'Hour'
    | 'Hrs'
    | 'Hr'
    | 'H'
    | 'Minutes'
    | 'Minute'
    | 'Mins'
    | 'Min'
    | 'M'
    | 'Seconds'
    | 'Second'
    | 'Secs'
    | 'Sec'
    | 's'
    | 'Milliseconds'
    | 'Millisecond'
    | 'Msecs'
    | 'Msec'
    | 'Ms'

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`

const isValidJwtExpiresIn = (value: string): value is StringValue => {
    return /^-?\d+(\s?(ms|s|m|h|d|w|y))?$/i.test(value)
}

const { JWT_SECRET, JWT_EXPIRES_IN } = loadEnv()

interface JwtPayload {
    userId: string
    email?: string
    role: 'admin' | 'user'
}

const jwtSecret: Secret = JWT_SECRET

const DEFAULT_EXPIRES_IN: StringValue = '1h'

let expiresIn: number | StringValue = DEFAULT_EXPIRES_IN

if (JWT_EXPIRES_IN && JWT_EXPIRES_IN.trim() !== '') {
    const raw = JWT_EXPIRES_IN.trim()

    if (isValidJwtExpiresIn(raw)) {
        expiresIn = raw
    } else if (!Number.isNaN(Number(raw))) {
        expiresIn = Number(raw)
    } else {
        throw new Error(`Invalid JWT_EXPIRES_IN value: "${raw}"`)
    }
}

const signOptions: SignOptions = {
    expiresIn
}

export const signToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, jwtSecret, signOptions)
}

export const verifyToken = (token: string): JwtPayload => {
    return jwt.verify(token, jwtSecret) as JwtPayload
}
