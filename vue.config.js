const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8000, // 将端口设置为 8000
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // 后端服务地址
        changeOrigin: true,
      },
    },
  },
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'));
  },
});
