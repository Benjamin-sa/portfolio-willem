module.exports = {
  extends: ["./.eslintrc.js", "plugin:vue/vue3-recommended"],
  rules: {
    // Vue specific overrides
    "vue/html-indent": ["error", 2],
    "vue/html-closing-bracket-newline": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-indent": "off",
  },
};
