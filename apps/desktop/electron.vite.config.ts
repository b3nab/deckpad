import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    build: {
      watch: {},
      //@ts-ignore
      // lib: {
      //   formats: ['es']
      // }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      watch: {},
      // rollupOptions: {
      //   output: {
      //     dir: 'out/preload',
      //     entryFileNames: 'index.cjs'
      //   }
      // }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      watch: {}
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()]
  }
})
