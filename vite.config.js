import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

const pathSrc = path.resolve(__dirname, 'src');

export default defineConfig({
    resolve: {
        alias: {
            '@': pathSrc
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/style/element.scss" as *;'
            }
        }
    },
    plugins: [
        Vue(),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue', 'vue-router'],
            exclude: [
                /NIM_Web_NIM_v9.2.0.js/
            ],

            // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon'
                })
            ],

            dts: path.resolve(pathSrc, 'auto-imports.d.ts')
        }),

        Components({
            resolvers: [
                // Auto register icon components
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep']
                }),
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver({ importStyle: 'sass', useSource: true })
            ],

            dts: path.resolve(pathSrc, 'components.d.ts')
        }),

        Icons({
            autoInstall: true
        }),
        createStyleImportPlugin({
            libs: [
                {
                    libraryName: 'element-plus',
                    esModule: true,
                    ensureStyleFile: true,
                    resolveStyle: (name) => {
                        console.log(name);
                        return `element-plus/theme-chalk/src/${name}.scss`;
                    }
                }
            ]
        }),

        Inspect()
    ]
});
