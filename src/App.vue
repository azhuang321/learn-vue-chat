<template>
    <div id="app">
        <router-view v-if="showView"/>
    </div>

</template>
<script>
import { isConnect } from '@/utils/nim/connection';
import { getNimInstance } from '@/utils/nim/init';

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


// const loadingInstance = ElLoading.service({ fullscreen: true, target: 'html' });
// getNimInstance();
//
// watch(isConnect, (isConnect) => {
//     console.dir(isConnect);
//     // if (isConnect === true) {
//     //     loadingInstance.close();
//     // }
// });

</script>
