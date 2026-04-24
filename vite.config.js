import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 若部署到 GitHub Pages 子路徑，請改為: base: '/your-repo-name/'
})
