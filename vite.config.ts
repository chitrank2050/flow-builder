import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';
import path from "node:path";
import { defineConfig, loadEnv } from 'vite';
import adsense from 'vite-plugin-adsense';
import { VitePluginRadar } from 'vite-plugin-radar';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');   // no `VITE_` prefix filter

  return {
    plugins: [
      react(),
      tailwindcss({
        optimize: {
          minify: Boolean(env.PROD)
        }
      }),
      VitePluginRadar({
        analytics: [
          { id: env.FLOW_BUILDER_GA_ID || '' },
        ],
      }),
      adsense({
        client: env.FLOW_BUILDER_AD_SENSE_ID || '',
      }),
    ],
    build: {
      cssMinify: "lightningcss",
      cssCodeSplit: true
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});