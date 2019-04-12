module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "camelcase": [1],
        "eqeqeq": [1, "always"],
        "indent": [2, 4],
        "no-empty-functions": [0],
        "semi": [1, "always"],
        "no-var": [1],
        "no-unused-vars": [2, { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    }
};