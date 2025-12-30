import mongoose from 'mongoose'
import { config } from 'dotenv'

config({ path: '.env.test' })

export async function connectTestDB() {
    if (mongoose.connection.readyState === 1) return

    await mongoose.connect(process.env.MONGO_DB_HOST_URI, {
        dbName: 'user_management_system_test'
    })
}

export async function disconnectTestDB() {
    //   await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
}
