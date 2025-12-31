import axios from 'axios'
let baseUrl = import.meta.env.VITE_BACKEND_API
export const api = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})
