<template>
    <div class="login-box">
        <div class="header">快捷登录</div>
        <div class="main">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="手机号"
                        class="cuborder-radius"
                        maxlength="11"
                        autocomplete="off"
                        @keyup.enter.native="onSubmit('form')"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="密码"
                        class="cuborder-radius"
                        autocomplete="new-password"
                        @keyup.enter.native="onSubmit('form')"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        class="submit-btn"
                        :loading="loginLoading"
                        @click="onSubmit('form')"
                    >立即登录
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <div class="links">
                        <el-link
                            type="primary"
                            :underline="false"
                            @click="toLink('/auth/forget')"
                        >
                            找回密码
                        </el-link>
                        <el-link
                            type="primary"
                            :underline="false"
                            @click="toLink('/auth/login')"
                        >
                            已有账号，立即登录?
                        </el-link>
                    </div>
                </el-form-item>

                <p style="margin-top: 50px">
                    <el-divider>
            <span style="color: rgb(181, 176, 176); font-weight: 200">
              <i class="el-icon-mobile-phone"/> 预览账号
            </span>
                    </el-divider>
                </p>
                <el-form-item class="preview-account">
                    <p>预览账号:18798272054 / 密码: admin123</p>
                    <p>预览账号:18798272055 / 密码: admin123</p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { setToken } from '@/utils/auth';
import { ServeLogin } from '@/api/auth';

export default {
    data () {
        return {
            loginLoading: false,
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '登录账号不能为空!',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '登录密码不能为空!',
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        onSubmit (formName) {
            if (this.loginLoading) return false;

            this.$refs[formName].validate(valid => {
                if (!valid) return false;
                this.loginLoading = true;
                this.login();
            });
        },

        login () {
            ServeLogin({
                mobile: this.form.username,
                password: this.form.password,
                platform: 'web'
            })
                .then(res => {
                    if (res.code == 200) {
                        const result = res.data;

                        // 保存授权信息到本地缓存
                        setToken(result.access_token, result.expires_in);

                        this.$store.commit('UPDATE_USER_INFO', result.userInfo);
                        this.$store.commit('UPDATE_LOGIN_STATUS');
                        this.$store.dispatch('LOAD_TALK_ITEMS');

                        // 登录成功后连接 WebSocket 服务器
                        this.$root.initialize();

                        this.toLink('/');

                        this.showNotice();
                    } else {
                        this.$notify.info({
                            title: '提示',
                            message: '登录密码不正确或账号不存在...'
                        });
                    }
                })
                .finally(() => {
                    this.loginLoading = false;
                });
        },

        toLink (url) {
            this.$router.push({
                path: url
            });
        },

        showNotice () {
            setTimeout(() => {
                this.$notify({
                    title: '友情提示',
                    message:
                        '此站点仅供演示、学习所用，请勿进行非法操作、上传或发布违法资讯。',
                    duration: 0
                });
            }, 3000);
        }
    }
};
</script>

<style lang="scss" scoped>
$hl-bg-cl:white;

.login-box{
    width: 3.9rem;
    min-height: 4.8rem;
    background-color: $hl-bg-cl;
    border-radius: .05rem;
    padding: .1rem .2rem;
    box-shadow: 0 4px 14px 0 rgba(206, 207, 209, 0.5);

    .header{
        width: 100%;
        height: .38rem;
        font-size: .22rem;
        margin: .25rem 0 .25rem 0;
    }

    .main {
        width: 100%;
        .links{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}


</style>
