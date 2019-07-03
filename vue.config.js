const path = require("path");
const { version } = require("./package.json");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const entry =
  process.env.NODE_ENV === "production"
    ? "./src/index.js"
    : "./examples/main.js";

module.exports = {
  pages: {
    index: {
      // 修改 src 目录 为 examples 目录
      entry: entry
    }
  },

  outputDir: resolve("dist"),

  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,

  //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,

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
  },

  devServer: {
    host: "0.0.0.0",
    port: "8099"
  }
};
