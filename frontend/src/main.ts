import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'

import Layout from 'ant-design-vue/es/layout'
import Menu from 'ant-design-vue/es/menu'
import Button from 'ant-design-vue/es/button'
import Typography from 'ant-design-vue/es/typography'
import Spin from 'ant-design-vue/es/spin'
import Alert from 'ant-design-vue/es/alert'
import Descriptions from 'ant-design-vue/es/descriptions'
import Empty from 'ant-design-vue/es/empty'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Layout)
app.use(Menu)
app.use(Button)
app.use(Typography)
app.use(Spin)
app.use(Alert)
app.use(Descriptions)
app.use(Empty)
app.mount('#app')
