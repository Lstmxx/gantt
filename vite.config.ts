import { defineConfig } from 'vite'
import path from 'path';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    lib: {
      entry: path.resolve(__dirname, 'src/vue-gantt.vue'),
      formats: ['cjs', 'es'],
      name: 'lib',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        preserveModules: true,
        globals: {
          vue: "Vue",
        },
      },
    },
  }
})
