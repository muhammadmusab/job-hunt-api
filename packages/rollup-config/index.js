import { babel } from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import sucrase from '@rollup/plugin-sucrase';

export default function config() {
  [
    {
      input: './index.ts',
      output: [
        {
          file: 'dist/index.js',
          format: 'cjs',
        },
        {
          file: 'dist/index.es.js',
          format: 'es',
          exports: 'named',
        },
      ],
      external: ['react/jsx-runtime', 'react', 'react-dom', 'react-is'],
      plugins: [
        scss({
          output: true,
          failOnError: true,
          outputStyle: 'compressed',
        }),
        babel({
          exclude: 'node_modules/**',
          presets: ['@babel/preset-react'],
        }),
        external(),
        resolve(),
        typescript(),
        terser(),
        sucrase({
          exclude: ['node_modules/**'],
          transforms: ['typescript'],
        }),
      ],
    },
  ];
}
