import { jest } from '@jest/globals'
import request from 'supertest'
import app from '../dist/app.js'
import User from '../dist/models/user.model.js'
import { connectTestDB, disconnectTestDB } from './setup.js'

jest.setTimeout(20000)

beforeAll(async () => {
    await connectTestDB()
})

beforeEach(async () => {
    await User.deleteMany({})
})

afterAll(async () => {
    await disconnectTestDB()
})

describe('Auth Module', () => {
    test('first user becomes admin', async () => {
        const res = await request(app).post('/api/auth/signup').send({
            fullName: 'Admin User',
            email: 'auth.admin@test.com',
            password: 'Password123'
        })

        expect(res.status).toBe(201)
        expect(res.body.data.role).toBe('admin')
    })

    test('second user becomes normal user', async () => {
        await request(app).post('/api/auth/signup').send({
            fullName: 'Admin User',
            email: 'auth.admin@test.com',
            password: 'Password123'
        })

        const res = await request(app).post('/api/auth/signup').send({
            fullName: 'Normal User',
            email: 'auth.user@test.com',
            password: 'Password123'
        })

        expect(res.status).toBe(201)
        expect(res.body.data.role).toBe('user')
    })
})
