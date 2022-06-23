<template>
  <div id="app">
    <router-view v-if="showView" />
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { CONNECT_NIM } from '@/store/modules/nim/constants';

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
// 发起连接
const store = useStore();
store.dispatch(CONNECT_NIM);
</script>
