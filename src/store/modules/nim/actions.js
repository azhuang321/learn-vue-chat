import { CONNECT_NIM } from './constants';

export const actions = {
    // 退出登录处理操作
    [CONNECT_NIM] ({ commit }) {
        console.log(123123);
        commit(CONNECT_NIM);
    }
};
