import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// E+
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'


// echarts
import * as echarts from 'echarts';


const app = createApp(App)
app.config.globalProperties.$echarts = echarts

app.use(ElementPlus, { locale });
app.use(store)
app.use(router)
app.use(ElementPlus)


// 循环遍历注册svg
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.mount('#app')

// createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
