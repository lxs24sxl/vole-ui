
module.exports = {
  presets: [
    ["@vue/app"],
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: false
      }
    ]
  ]
};
