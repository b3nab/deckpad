import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import sourceMaps from 'rollup-plugin-sourcemaps'
import dts from 'rollup-plugin-dts'

import pkg from './package.json' assert { type: 'json' }

const bundle = (config) => ({
  input: 'src/index.ts',
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },

  ...config,
})

export default [
  bundle({
    output: [
      { file: pkg.main, name: 'deckpadsdk', format: 'umd', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript(),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve(),

      // Resolve source maps to the original source
      sourceMaps(),
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: pkg.typings,
      format: 'es',
    },
  }),
]
