module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "plugins": [
        "import"
    ],
    "env": {
        "browser": true,
        "jasmine": true,
    },
    "rules": {
        "indent": ["error", 4],
        "semi": ["error", "never"],
        "quotes": ["error", "double"],
        "import/prefer-default-export": "off"
    }
};
