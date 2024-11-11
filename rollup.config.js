import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/index.es.js',
      format: 'esm',
    },
  ],
  plugins: [resolve(), commonjs(), typescript()],
  external: ['react', 'react-dom'],
};
