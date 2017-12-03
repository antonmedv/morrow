import typescript from 'typescript'
import pluginTypescript from 'rollup-plugin-typescript'

export default {
  input: './src/main.ts',
  output: {
    file: 'index.js',
    format: 'cjs'
  },
  plugins: [
    pluginTypescript({typescript})
  ]
}
