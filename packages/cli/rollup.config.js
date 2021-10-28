import pkg from './package.json'
import json from '@rollup/plugin-json'
import { preserveShebangs } from'rollup-plugin-preserve-shebangs'
import autoExternal from'rollup-plugin-auto-external'

export default {
  input: pkg.source,
  output: {
    file: pkg.main,
  },
  plugins: [
    preserveShebangs(),
    json(),
    autoExternal(),
  ]
}