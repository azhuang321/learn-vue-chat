<template>
    <div class="panel">
        <el-container class="full-height">
            <el-header height="60px" class="header no-select border">
                <p>我的好友({{ friendsList.length }})</p>
            </el-header>
            <el-main class="panel-body no-padding lum-scrollbar">
                <template v-if="friendsListStatue === 0">
                    <Loading/>
                </template>
                <template v-else-if="friendsListStatue === 1 && friendsList.length === 0">
                    <Empty text="暂无好友"/>
                </template>

                <template v-if="friendsListStatue === 1">
                    <div
                        v-for="(item, index) in friendsList"
                        :key="item.account"
                        class="data-item"
                        @click="showCardFunc(item, index)"
                    >
                        <el-avatar
                            class="avatar"
                            shape="square"
                            :size="35"
                            :src="item.avatar ? item.avatar : defaultAvatar"
                        >
                            {{ item.account.substr(0, 1) }}
                        </el-avatar>
                        <div class="card">
                            <div class="title">
                                <span class="name">
                                  {{ item.account ? item.account : item.nick }}
                                </span>
                                <div v-show="item.online == 1" class="larkc-tag agree">
                                    在线
                                </div>
                            </div>
                            <div class="content">
                                [个性签名] 「{{ item.sign ? item.sign : '未设置' }}」
                            </div>
                        </div>

                        <div class="apply-from" @click.prevent.stop>
                            <el-button
                                size="small"
                                type="primary"
                                icon="el-icon-s-promotion"
                                @click="toTalk(1, item.id)"
                            >发送消息
                            </el-button>
                            <el-button
                                size="small"
                                type="danger"
                                icon="el-icon-delete"
                                @click="deleteFriend(item, index)"
                            >删除好友
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Empty from '@/components/global/Empty.vue';
import Loading from '@/components/global/Loading.vue';
import { toTalk } from '@/utils/talk';
import { getFriends } from '@/utils/nim/user';

import defaultAvatar from '@/assets/image/detault-avatar.jpg';

const useFriendsListEffect = () => {
    const friendsList = reactive([]);
    const friendsListStatue = ref(0);
    const getFriendsListFunc = () => {
        getFriends().then((friends) => {
            friendsList.length = 0;
            friendsList.push(...friends);
            friendsListStatue.value = 1;
        });
    };
    return {
        defaultAvatar,
        friendsListStatue,
        friendsList,
        getFriendsListFunc
    };
};

// 查看用户名片
const useShowUserInfoEffect = () => {
    const showCard = inject('ShowUserCardFunc');
    const showCardFunc = (item, index) => {
        showCard(item.account, {
            editRemarkCallback: data => {
                this.items[index].friend_remark = data.remarks;
            }
        });
    };
    return {
        showCardFunc
    };
};

export default {
    components: {
        Empty,
        Loading
    },
    data () {
        return {
            // friendsList: [],
            status: 1
        };
    },
    methods: {
        //
        // // 删除好友
        // deleteFriend (item, index) {
        //     const nickname = item.friend_remark || item.nickname;
        //     this.$alert(`您确定要删除【${nickname}】好友吗？`, '温馨提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         showCancelButton: true,
        //         closeOnClickModal: true,
        //         callback: action => {
        //             if (action != 'confirm') {
        //                 return false;
        //             }
        //
        //             const friend_id = item.id;
        //             ServeDeleteContact({
        //                 friend_id
        //             }).then(res => {
        //                 if (res.code == 200) {
        //                     this.$delete(this.items, index);
        //                     this.$message({
        //                         message: `好友 【${nickname}】已删除 ...`,
        //                         type: 'success'
        //                     });
        //                 } else {
        //                     this.$message({
        //                         message: `好友 【${nickname}】删除失败 ...`,
        //                         type: 'info'
        //                     });
        //                 }
        //             });
        //         }
        //     });
        // },
        //
        //
        // // 跳转聊天页面
        // toTalk (talk_type, receiver_id) {
        //     toTalk(talk_type, receiver_id);
        // }
    }
};
</script>

<script setup>
const { defaultAvatar, friendsListStatue, friendsList, getFriendsListFunc } = useFriendsListEffect();
const { showCardFunc } = useShowUserInfoEffect();
onActivated(getFriendsListFunc);


// todo 封装消息提示
// ElNotification({
//     type: 'success',
//     title: 'Title',
//     message: h('i', { style: 'color: teal' }, 'This is a reminder')
// });

</script>
<style lang="scss" scoped>
@import '@/assets/css/page/contacts.scss';
</style>
