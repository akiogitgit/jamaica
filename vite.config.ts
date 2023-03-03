import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WindiCSS()],
})
