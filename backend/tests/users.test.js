import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../dist/app.js'
import User from '../dist/models/user.model.js'
import { connectTestDB, disconnectTestDB } from './setup.js'

jest.setTimeout(20000)

let adminToken
let userToken
let userId
let adminId
let createdUserEmail
let createdAdminEmail

beforeAll(async () => {
    await connectTestDB()
})

beforeEach(async () => {
    await User.deleteMany({})

    createdAdminEmail = `admin_${Date.now()}@test.com`
    createdUserEmail = `user_${Date.now()}@test.com`

    const adminResSignup = await request(app).post('/api/auth/signup').send({
        fullName: 'Admin',
        email: createdAdminEmail,
        password: 'Password123'
    })
    const adminResLogin = await request(app).post('/api/auth/login').send({
        fullName: 'Admin',
        email: createdAdminEmail,
        password: 'Password123'
    })

    adminToken = adminResLogin.body.data.token
    adminId = adminResLogin.body.data.id

    const userResSignup = await request(app).post('/api/auth/signup').send({
        fullName: 'User',
        email: createdUserEmail,
        password: 'Password123'
    })

    const userResLogin = await request(app).post('/api/auth/login').send({
        fullName: 'User',
        email: createdUserEmail,
        password: 'Password123'
    })

    userToken = userResLogin.body.data.token

    // const user = await User.findOne({ email: userResLogin.body.data.email })
    userId = userResLogin.body.data.id
})

afterAll(async () => {
    await disconnectTestDB()
})

describe('Users Module', () => {
    test('unauthenticated access is blocked', async () => {
        const res = await request(app).get('/api/users/me')
        expect(res.status).toBe(401)
    })

    test('authenticated user can fetch profile', async () => {
        const res = await request(app).get('/api/users/me').set('Authorization', `Bearer ${userToken}`)

        expect(res.status).toBe(200)
        expect(res.body.data.email).toBe(createdUserEmail)
    })

    test('admin can list users', async () => {
        const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
        expect(res.body.data.users.length).toBeGreaterThanOrEqual(2)
    })

    test('admin can deactivate a normal user', async () => {
        const res = await request(app).put(`/api/users/${userId}/deactivate`).set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)

        const updatedUser = await User.findById(userId)
        expect(updatedUser.status).toBe('inactive')
    })

    test('cannot deactivate last remaining admin', async () => {
        const res = await request(app).put(`/api/users/${adminId}/deactivate`).set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(400)
        expect(res.body.message).toMatch(/at least one admin/i)
    })
})
