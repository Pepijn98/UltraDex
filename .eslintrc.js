module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        "@nuxtjs",
        "@nuxtjs/eslint-config-typescript",
        "plugin:nuxt/recommended",
        "plugin:vue/essential"
    ],
    // add your custom rules here
    rules: {
        // nuxt specific config
        "nuxt/no-cjs-in-config": "off",

        // vue specific config
        "vue/no-unused-vars": "off",
        "vue/order-in-components": "off",
        "vue/html-closing-bracket-newline": "off",
        "vue/html-indent": ["error", 4],
        "vue/singleline-html-element-content-newline": "off",

        // typescript specific config
        "@typescript-eslint/no-unused-vars": "off",

        // general eslint config
        "arrow-parens": ["error", "always"],
        "curly": "off",
        "indent": ["error", 4, {
            "SwitchCase": 1
        }],
        "import/order": "off",
        "no-array-constructor": "off",
        "no-console": "off",
        "no-undef": "off",
        "no-unused-vars": "off",
        "object-shorthand": "off",
        "prefer-promise-reject-errors": "off",
        "quotes": ["error", "double"],
        "quote-props": "off",
        "semi": ["error", "always"],
        "semi-spacing": "error",
        "semi-style": ["error", "last"],
        "space-before-function-paren": "off"
    }
}
