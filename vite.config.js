import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/DD-Real-Estate-V1/',
    server: {
        allowedHosts: [
            'xlztvg-5173.csb.app',
            '.csb.app' // Allow all CodeSandbox hosts
        ]
    }
})
