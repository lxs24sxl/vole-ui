let fs = require("fs");

const fileMap = function(path, cb) {
  let files = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);

    let file = null;
    for (let i = 0, len = files.length; i < len; i++) {
      file = files[i];

      let currentPath = path + "/" + file;

      if (fs.statSync(currentPath).isDirectory()) {
        cb("directory", currentPath, files);
      } else {
        cb("file", currentPath, files);
      }
    }
    cb("end", path, files);
  }
}

const deleteDir = function (path) {
  fileMap(path, (type, currentPath) => {
    switch (type) {
      case "directory":
        deleteDir(currentPath);
        break;
      case "file":
        fs.unlinkSync(currentPath);
        break;
      case "end":
        fs.rmdirSync(path);
        break;
    }
  });
};

const renameFiles = async function(path, cb) {
  let errorLen = 0;

  fileMap(path, async (type, currentPath, files) => {
    switch (type) {
      case "file":
        await fs.rename(
          currentPath,
          currentPath.replace(/common\.js/, "js"),
          err => {
            if (err) {
              errorLen += 1;
            }
          }
        );
        break;
      case "end":
        cb(files.length - errorLen, errorLen);
        break;
    }
  });
};

this.deleteDir = deleteDir;
this.renameFiles = renameFiles;
this.fileMap = fileMap;