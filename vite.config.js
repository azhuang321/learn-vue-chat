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
import importToCDN, { autoComplete } from 'vite-plugin-cdn-import';


// import { dayjs } from 'element-plus';
// import dayjs from 'dayjs/dayjs.min';

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
        importToCDN({
            modules: [
                autoComplete('lodash'),
                {
                    name: 'element-plus',
                    var: 'ElementPlus',
                    path: 'https://cdn.jsdelivr.net/npm/element-plus@2.1.9'
                }
            ]
        }),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue', 'vue-router'],
            exclude: [
                /NIM_Web_NIM_v9.2.0.js/,
                /dayjs.min.js/
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
                        return `element-plus/theme-chalk/${name}.css`;
                    }
                }
            ]
        }),

        Inspect()
    ],
    optimizeDeps: {
        include: ['dayjs']
    },
    build: {
        target: ['chrome90'],
        rollupOptions: {
            external: [
                'element-plus'
            ]
        },
        commonjsOptions: {
            include: [/node_modules/],
            dynamicRequireTargets: [
                // include using a glob pattern (either a string or an array of strings)
                'node_modules/dayjs/dayjs.min.js',

                // exclude files that are known to not be required dynamically, this allows for better optimizations
                '!node_modules/dayjs/dayjs.min.js'
            ],
            // exclude: ['node_modules/dayjs/dayjs.min.js']
            exclude: [
                /dayjs/,
                /dayjs.min.js/,
                /customParseFormat.js/
            ]
        }


    }
});
