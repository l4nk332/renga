import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from "rollup-plugin-terser"
import pkg from './package.json'

const BANNER = `
/*
 * renga v${pkg.version} (https://github.com/l4nk332/renga)
 * Copyright (c) 2019 Ian Jabour
 * Licensed under MIT (https://github.com/l4nk332/renga/blob/master/LICENSE)
*/
`.trim()

const SHARED_OUTPUT = {
  banner: BANNER
}

const SHARED_PLUGINS = [
  resolve(),
  babel({
    exclude: 'node_modules/**'
  })
]

const TERSER = terser({
  output: {
    comments: "all"
  }
})

export default [
  {
    input: './src/entry.js',
    output: {
      file: './dist/renga.js',
      format: 'esm',
      ...SHARED_OUTPUT
    },
    plugins: SHARED_PLUGINS
  },
  {
    input: './src/entry.js',
    output: {
      file: './dist/renga.min.js',
      format: 'esm',
      ...SHARED_OUTPUT
    },
    plugins: [...SHARED_PLUGINS, TERSER]
  },
  {
    input: './src/entry.js',
    output: {
      file: './dist/renga_iife.js',
      format: 'iife',
      name: 'renga',
      ...SHARED_OUTPUT
    },
    plugins: SHARED_PLUGINS
  },
  {
    input: './src/entry.js',
    output: {
      file: './dist/renga_iife.min.js',
      format: 'iife',
      name: 'renga',
      ...SHARED_OUTPUT
    },
    plugins: [...SHARED_PLUGINS, TERSER]
  },
]
