<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <div class="logo-name animated slideInLeft">
                    {{ $store.state.website_name }}
                    logo-name
                </div>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>
                <div class="copyright" v-html="$store.state.copyright"></div>
            </el-footer>
        </el-container>

        <div class="fly-box">
            <div class="fly bg-fly-circle1"></div>
            <div class="fly bg-fly-circle2"></div>
            <div class="fly bg-fly-circle3"></div>
            <div class="fly bg-fly-circle4"></div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
:deep(..el-input__inner) {
    border-radius: .01rem !important;
}

$bg-color: #f6f8fb;
$theme-color: #2196f3;

.common-layout{
    background-color: $bg-color;
    width: 100%;
    height: 100%;

    .el-container{
        width: 100%;
        height: 100%;

        .el-header{
            flex: 1;
            .logo-name{
                font-size: .34rem;
                font-family: Times New Roman, Georgia, Serif, serif;
                color: $theme-color;
                margin-left: .2rem;
                margin-top: .2rem;
            }
        }
        .el-main {
            flex: 8;
            width: 100%;
            height: 100%;
            display: flex;
            background-color: $bg-color;
            justify-content: center;
            align-items: center;
        }

        .el-footer{
            flex: 1;
        }
    }
}

</style>
