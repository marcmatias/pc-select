import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "SelectActions",
      fileName: () => 'pc-sa-select.js',
      formats: ['umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: "pc-sa-select.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});

