import pkg from './package.json'
import { preserveShebangs } from'rollup-plugin-preserve-shebangs'
import json from '@rollup/plugin-json'

export default {
  input: pkg.source,
  output: {
    file: pkg.main,
  },
  plugins: [
    preserveShebangs(),
    json(),
  ]
}