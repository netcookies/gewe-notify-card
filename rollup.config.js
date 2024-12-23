import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy'; // 引入 rollup-plugin-copy 插件

export default {
  input: 'src/gewe-notify-card.js',
  output: {
    file: 'dist/gewe-notify-card.js',
    format: 'iife',
    name: 'GeweNotifyCard',
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
    // 添加 rollup-plugin-copy 配置
    copy({
      targets: [
        { src: 'src/images/*', dest: 'dist/images' } // 将 src/images 下的所有文件复制到 dist/images 目录
      ]
    })
  ],
};

