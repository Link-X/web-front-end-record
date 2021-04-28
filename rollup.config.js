import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'
const path = require('path')

const resolve = function (...args) {
    return path.resolve(__dirname, ...args)
}

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
            name: 'Record',
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
const extensions = ['.js', '.ts']

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

        alias({
            entries: [{ find: '@/utils', replacement: resolve('./src/utils') }, {find: '@', replacement: resolve('./src')}],
        }),
    ],
    external: [],
}
