module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2021": true
  },
  "extends": [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "no-debugger": "off",
    "no-console": "off",
    "class-methods-use-this": "off",
    '@typescript-eslint/no-var-requires': 'off',
  }
}
