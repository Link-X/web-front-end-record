import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const path = require('path')

const resolve = function (...args) {
    return path.resolve(__dirname, ...args)
}

const extensions = ['.js', '.ts']

const moduleDatas = {
    esm: {
        output: {
            format: 'esm',
            file: resolve('./dist/web-front-end-record.esm.js'),
        },
    },
    umd: {
        output: {
            format: 'umd',
            file: resolve('./dist/web-front-end-record.umd.js'),
        },
    },
    cjs: {
        output: {
            format: 'cjs',
            file: resolve('./dist/web-front-end-record.cjs.js'),
        },
    },
}

const modulesConfig = moduleDatas[process.env.MODULE]

export default {
    input: resolve('./src/index.ts'),
    ...modulesConfig,
    plugins: [
        json(),
        nodeResolve({
            extensions,
            modulesOnly: true,
            customResolveOptions: {
                moduleDirectory: 'node_modules',
            },
        }),
        babel({
            exclude: 'node_modules/**',
            extensions,
        }),
        terser(),
    ],
    external: [],
}
