import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';
export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'es', // 输出格式，这里使用立即执行函数,
    },
    plugins: [
        typescript(),
        resolve({
            browser: true,
        }),
        json(),
        commonjs(),
    ],
    watch: {
        include: [
            "src/**",
            "build/rollup.config.ts"
        ]
    }
});
