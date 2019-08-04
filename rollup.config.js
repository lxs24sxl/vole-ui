import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";
export default {
  input: "src/index",

  output: {
    file: `lib/index.js`,
    format: "cjs"
  },

  plugins: [
    json(),

    vue({
      compileTemplate: true,
      css: false
    }),

    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),

    commonjs({ extensions: [".js", ".ts"] }),

    terser(),

    babel({
      exclude: [/\/core-js\//, /runtime/, /node_modules/], // 只转译源码
      runtimeHelpers: true,
      sourceMap: true,
      extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"]
    })
  ],

  external: ["core-js", "vue", "throttle-debounce", "resize-observer-polyfill"]
};
