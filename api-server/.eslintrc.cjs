module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"]
  }
};
