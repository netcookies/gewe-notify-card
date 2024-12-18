import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/gewe-notify-card.js', // 入口文件
  output: {
    file: 'dist/gewe-notify-card.js', // 打包后的文件
    format: 'esm', // 输出格式
    globals: {
      'lit-element': 'litElement',
      'custom-card-helpers': 'customCardHelpers'
    },
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
    }),
    terser(), // 压缩代码
  ],
};

