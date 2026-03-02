import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { VitePluginRadar } from 'vite-plugin-radar'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');   // no `VITE_` prefix filter

  return {
    plugins: [
      VitePluginRadar({
        analytics: [
          { id: env.FLOW_BUILDER_GA_ID || '' },
        ],
      }),
      react(),
    ],
  };
});