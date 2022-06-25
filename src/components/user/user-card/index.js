import UserCardDetail from './UserCardDetail.vue';

let $inst;
// 创建挂载实例
const createMount = (opts) => {
    const mountNode = document.createElement('div');
    document.body.appendChild(mountNode);

    const app = createApp(UserCardDetail, {
        ...opts,
        modelValue: true,
        remove () {
            app.unmount(mountNode);
            document.body.removeChild(mountNode);
        }
    });
    return app.mount(mountNode);
};

function V3Popup (options = {}) {
    options.id = options.id || 'v3popup_' + generateId();
    $inst = createMount(options);

    return $inst;
}


const myPlugin = {
    install (app, options) {
        console.dir(123);
        app.component('v3-popup', UserCardDetail);
        // app.config.globalProperties.$v3popup = V3Popup
        app.provide('v3popup', V3Popup);
    }
};

export { myPlugin };


/**

 https://developer.51cto.com/article/664073.html

 https://betterprogramming.pub/designing-vue3-plugins-using-provide-and-inject-47b586d9ce4
 https://juejin.cn/post/6912606020673994760
 https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html#%E8%AE%BE%E6%83%B3%E5%9C%BA%E6%99%AF
 https://v3.cn.vuejs.org/guide/render-function.html#%E8%99%9A%E6%8B%9F-dom-%E6%A0%91
 */

//     // 插件开发  对数据做校验的插件
//     const myPlugin = {
//     install(app, options) {
//     app.provide('name', 'Dell Lee');
//     app.directive('focus', {
//     mounted(el) {
//     el.focus();
// }
// })
//     app.mixin({
//     mounted(){
//     console.log('mixin')
// }
// })
//     app.config.globalProperties.$sayHello = 'hello world';
// }
// }
//
//     const app = Vue.createApp({
//     template: `
//       <my-title />
//     `
// });
//
//     app.component('my-title', {
//     inject: ['name'],
//     mounted() {
//     console.log(this.$sayHello);
// },
//     template: `<div>{{name}}<input v-focus /></div>`
// })
//
//     app.use(myPlugin, { name: 'dell'});
//
//     const vm = app.mount('#root');
