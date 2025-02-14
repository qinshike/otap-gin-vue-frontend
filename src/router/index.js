import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App.vue';
import FormPage from '@/views/FormPage.vue';

const routes = [
  { path: '/', component: App },
  { path: '/form', name: 'FormPage', component: FormPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 检查是否有全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果这里的逻辑导致不调用 next()，则路由不会跳转
  next(); 
});
export default router;