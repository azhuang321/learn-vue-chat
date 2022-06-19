module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        // 关闭 组件必须多单词
        'vue/multi-word-component-names': 'off',
        // 单引号，双引号相关
        quotes: ['warn', 'single'],
        // quotes: ["error", "double",],
        // 结尾是否必须要分号
        semi: ['warn', 'always'],
        // 允许空行数
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
        indent: ['error', 4]
    }
};
