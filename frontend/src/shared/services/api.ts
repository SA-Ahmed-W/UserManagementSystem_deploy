import axios from 'axios'

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

// global error handling
api.interceptors.response.use(
    (res) => res,
    (error) => {
        return Promise.reject(error)
    }
)
