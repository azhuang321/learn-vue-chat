// import { ElNotification } from 'element-plus';

export const onMyInfo = (obj) => {
    console.log(obj);
};

export const getFriends = (nim, friendsList) => {
    nim.getFriends({
        done: (error, friends) => {
            if (error) {
                ElNotification({
                    type: 'success',
                    title: 'Title',
                    message: h('i', { style: 'color: teal' }, 'This is a reminder')
                });
                return;
            }
            console.dir(friends);
            friendsList = friends;
        }
    });
};
