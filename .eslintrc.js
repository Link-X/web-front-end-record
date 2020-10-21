module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'standard-with-typescript',
    ],
    env: {
        es6: true,
        node: true,
    }
}
