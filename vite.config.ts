/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePluginRadar } from 'vite-plugin-radar'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePluginRadar({
      analytics: [
        {
          id: import.meta.env.FLOW_BUILDER_GA_ID || '',
        }
      ]
    }),
    react()],
})
