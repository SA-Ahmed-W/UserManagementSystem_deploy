import { connect } from 'mongoose'
import config from './env.js'

/**
 * Connects to the MongoDB database using the URI stored in the MONGO_DB_HOST_URI environment variable.
 * If the connection is successful, it logs a success message to the console.
 * If the connection fails, it logs an error message to the console and exits the process with a status code of 1.
 * @returns {Promise<void>} A promise that resolves when the connection is established or rejects when the connection fails.
 */
export const connectDB = async () => {
    try {
        await connect(config.MONGO_DB_HOST_URI)
        console.log('Database connected')
    } catch (err) {
        console.error('Failed to connect to database:', err)
        process.exit(1)
    }
}
