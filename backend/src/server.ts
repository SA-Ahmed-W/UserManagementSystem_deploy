import app from './app.js'
import { loadEnv } from './config/env.js'
import { connectDB } from './config/db.js'
import mongoose from 'mongoose'

async function startServer() {
    try {
        const env = loadEnv()

        await connectDB()

        app.listen(env.PORT, () => {
            console.log(`Server started on port ${env.PORT}`)
        })
    } catch (error) {
        console.error(error)
        mongoose.connection.close()
        process.exit(1)
    }
}

startServer()
