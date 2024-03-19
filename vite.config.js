import { fileURLToPath, URL } from 'url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // devServer: {
  //   proxy: 'http://localhost:5173/'
  // }
  // devServer: {
  //   proxy: {
  //     '^/apikemenagbonebol': {
  //       target: 'http://192.168.1.34',
  //       ws: true,
  //       changeOrigin: true
  //     }
  //   }
  // }


});
