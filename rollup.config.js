import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/gewe-notify-card.js', // 源代码路径
  output: {
    file: 'dist/gewe-notify-card.js', // 输出路径
    format: 'iife', // 兼容性更强的格式
    name: 'GeweNotifyCard', // 全局变量名
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
      ],
      plugins: [
        ["@babel/plugin-proposal-decorators", { "decoratorsBeforeExport": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
      ],
    }),
  ],
};

