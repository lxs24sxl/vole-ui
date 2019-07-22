const path = require("path");
const { version } = require("./package.json");

let Components = require("./components.json");
const resolve = dir => path.join(__dirname, dir);

const IS_PROD = process.env.NODE_ENV === "production";
const ENTRY = IS_PROD ? "./src/index.js" : "./examples/main.js";

const getPages = () => {
  const normal = {
    entry: ENTRY
  };
  if (IS_PROD) {
    let pages = {};
    pages.index = normal;

    for (let key in Components) {
      pages[key] = {
        entry: Components[key]
      };
      return pages;
    }
  } else {
    return { index: normal };
  }
};

let pages = getPages();

module.exports = {
  pages,
  // entry: entry,/
  outputDir: resolve("dist"),

  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,

  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    // examples/docs是存放md文档的地方，也不需要eslint检查
    config.module
      .rule("eslint")
      .exclude.add(path.resolve("lib"))
      .end()
      .exclude.add(path.resolve("examples/docs"))
      .end();

    // packages和examples目录需要加入编译
    config.module
      .rule("js")
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .include.add(/src/)
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });

    config.resolve.alias
      .set("vole-ui", resolve("src"))
      .set("vue$", "vue/dist/vue.esm.js");

    config.plugin("define").tap(([options = {}]) => {
      return [
        {
          ...options, // these are the env variables from your .env file, if any arr defined
          "process.env.VERSION": JSON.stringify(version)
        }
      ];
    });

    if (IS_PROD) {
      config.output
        .filename("[name].js")
        .chunkFilename("[name].js")
        .libraryTarget("commonjs2");

      config.optimization.delete("splitChunks");
      // 压缩代码
      config.optimization.minimize(true);
    }
  },

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },

  devServer: {
    host: "0.0.0.0",
    port: "8099"
  }
};
