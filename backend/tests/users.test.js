import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../dist/app.js'
import User from '../dist/models/user.model.js'
import { connectTestDB, disconnectTestDB } from './setup.js'

jest.setTimeout(20000)

let adminToken
let userToken
let userId

beforeAll(async () => {
    await connectTestDB()
    await User.deleteMany({})

    const admin = await request(app).post('/api/auth/signup').send({
        fullName: 'Admin',
        email: 'user.admin@test.com',
        password: 'Password123'
    })

    adminToken = admin.body.data.token

    const user = await request(app).post('/api/auth/signup').send({
        fullName: 'User',
        email: 'user.user@test.com',
        password: 'Password123'
    })

    userToken = user.body.data.token

    const u = await User.findOne({ email: 'user.user@test.com' })
    userId = u.id
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
    })

    test('admin can list users', async () => {
        const res = await request(app).get('/api/users').set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
    })

    test('admin can deactivate user', async () => {
        const res = await request(app).put(`/api/users/${userId}/deactivate`).set('Authorization', `Bearer ${adminToken}`)

        expect(res.status).toBe(200)
    })
})
