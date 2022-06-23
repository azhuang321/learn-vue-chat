import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store';
import 'normalize.css';
import '@/assets/css/base.scss';

import '@/style/index.scss';

import registerDirectives from './core/directives';// 自定义指令


const app = createApp(App);
registerDirectives(app);


app.use(router)
    .use(store)
    .mount('#app');
