import { getNimInstance } from '@/utils/nim/init';

// 回调: 用户信息
const onMyInfo = (obj) => {
    console.log('my info', obj);
};

// 获取用户好友
const getFriends = async () => {
    const nim = await getNimInstance();
    return new Promise((resolve, reject) => {
        nim.getFriends({
            done: async (error, friends) => {
                if (error) return reject(error);
                const friendsAccounts = friends.map(i => i.account);
                const usersInfo = await getUsers(friendsAccounts, false);
                const friendsList = nim.cutFriends(nim.mergeFriends(friends, usersInfo), friends.invalid);
                resolve(friendsList);
            }
        });
    });
};

// 获取用户名片
const getUsers = async (accounts, isSync = true) => {
    const nim = await getNimInstance();
    return new Promise((resolve, reject) => {
        nim.getUsers({
            accounts: accounts,
            sync: isSync,
            done: (error, users) => {
                if (error) return reject(error);
                resolve(users);
            }
        });
    });
};

export {
    onMyInfo, getFriends, getUsers
};


// 去重数组
// const test = friends.reduce((acc, { account }) => {
//     if (!acc.includes(account)) acc.push(account);
//     return acc;
// }, []);
// console.dir(test);
