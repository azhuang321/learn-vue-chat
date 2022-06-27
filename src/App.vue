<template>
    <div id="app">
        <router-view v-if="showView"/>
    </div>

</template>
<script>
import { isConnect } from '@/utils/nim/callback';
import { getNimInstance } from '@/utils/nim/init';
import { useStore } from 'vuex';
// import 'element-plus/theme-chalk/src/loading.scss';

import { CONNECT_STATUS, CONNECT_STATUS_ARR } from '@/store/modules/nim/constants';

export default {
    name: 'App',
    data () {
        return {
            // 用于点击当前页的router时，刷新当前页
            showView: true
        };
    },
    mounted () {

    },
    methods: {
        // 刷新当前路由方法
        refreshView () {
            this.showView = false;
            this.$nextTick(() => (this.showView = true));
        }
    }
};

</script>
<script setup>
const store = useStore();

const connectStatus = computed(() => store.getters.connectStatus);

watch(connectStatus, (status) => {
    console.log(status);
});

setTimeout(() => {
    store.commit(CONNECT_STATUS, CONNECT_STATUS_ARR.connected);
}, 2000);

const loadingInstance = ElLoading.service({ fullscreen: true, target: 'html' });

setTimeout(() => {
    loadingInstance.close();
}, 2000);


</script>
