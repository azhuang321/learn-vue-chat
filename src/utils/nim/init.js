import config from '@/config/config';
import { onConnect, onError, onWillReconnect, onDisConnect } from './connection';
await import(`../../nim_sdk/${config.sdk}.js`);


export const initNim = () => {
    window.NIM.getInstance({
        debug: false,
        appKey: config.appkey,
        account: 'azhuang',
        token: '4297f44b13955235245b2497399d7a93',
        transports: ['websocket'],
        db: true,
        syncSessionUnread: true,
        syncRobots: true,
        autoMarkRead: true,
        onconnect: onConnect,
        onerror: onError,
        onwillreconnect: onWillReconnect,
        ondisconnect: onDisConnect,
        onsyncdone: function onSyncDone () {
            // 说明在聊天列表页
            console.dir('同步完成');
        }
    });
};
