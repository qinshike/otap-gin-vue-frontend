import wx from "weixin-js-sdk";
import axios from "axios";
import './assets/css/global.css';
import { createApp } from "vue";
import App from './App.vue';

import router from "./router";

// 创建 Vue 应用
const app = createApp(App);
console.log('router 实例:', router); // 打印 router 实例
// 配置微信 JS-SDK 和 Axios
app.config.globalProperties.$wx = wx;
app.config.globalProperties.$http = axios;

// 使用 Vue Router
app.use(router);

// 挂载 Vue 应用到 #app 元素
app.mount("#app");
