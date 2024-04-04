import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://employee-details-kqpd.onrender.com",
      // "/api": "http://localhost:3000",
    }
  },
  plugins: [react()],
})
