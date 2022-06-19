import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ElProgress as Progress, ElSelect, ElOption } from 'element-plus';
import store from '@/store';
import 'normalize.css';
import '@/assets/css/base.scss';

import '@/style/index.scss';

createApp(App)
    .use(router)
    .use(Progress)
    .use(ElSelect)
    .use(ElOption)
    .use(store)
    .mount('#app');
