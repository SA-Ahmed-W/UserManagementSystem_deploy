/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: 'development' | 'production'
    readonly VITE_BACKEND_API: string
}
