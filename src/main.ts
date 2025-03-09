import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/main.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router);
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// app.component('vue-markdown', vueMarkdown)

app.mount('#app');

// const loadScript = (src: string) => {
//   return new Promise((resolve, reject) => {
//     const script = document.createElement('script')
//     script.type = 'module'
//     script.src = src
//     script.onload = resolve
//     script.onerror = reject
//     document.head.appendChild(script)
//   })
// }

// loadScript('grammar.mjs')