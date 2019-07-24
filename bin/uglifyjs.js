let UglifyJS = require("uglify-js");
let fs = require("fs");
let { fileMap } = require("./file");

const uglifyJSInDir = function (path, cb) {
  let to = null;
  let result = null;
  let success = 0;
  fileMap(path, (type, currentPath, files) => {
    switch (type) {
      case "directory":
        break;
      case "file":
        if (!/\.min\.js/.test(currentPath)) {

          to = currentPath.replace(/\.js/, ".min.js");

          result = UglifyJS.minify(fs.readFileSync(currentPath, "utf-8"));

          success = result.error === undefined ? success + 1 : success;

          if (!fs.existsSync(to)) {
            fs.writeFileSync(
              currentPath.replace(/\.js/, ".min.js"),
              result.code,
              "utf-8"
            );
          }
        }

        break;
      case "end":
        cb(success, files.length - success);
        break;
    }
  });
}


this.uglifyJSInDir = uglifyJSInDir;
