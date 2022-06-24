import { getNimInstance } from '@/utils/nim/init';

export const onMyInfo = (obj) => {
    console.log('my info', obj);
};

export const getFriends = async () => {
    const nim = await getNimInstance();

    return new Promise((resolve, reject) => {
        nim.getFriends({
            done: (error, friends) => {
                if (error) {
                    // todo 封装消息提示
                    ElNotification({
                        type: 'success',
                        title: 'Title',
                        message: h('i', { style: 'color: teal' }, 'This is a reminder')
                    });
                    return;
                }
                resolve(friends);
            }
        });
    });
};
