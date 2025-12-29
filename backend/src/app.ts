import express, { type Request, type Response, type Express } from 'express'
import config from './config/env.js'
import cors from 'cors'

const app: Express = express()

// Core middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
    cors({
        origin: config.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    })
)

// Basic routes
app.get('/', (_req: Request, res: Response) => {
    res.send('User Management System API is running')
})

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('OK')
})

export default app
