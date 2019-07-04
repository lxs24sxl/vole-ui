
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const Components = require('../components.json');

/**
 * 格式化组件
 */
let formatComponentObject = () => {
  let temp = Components;
  temp['vole-ui'] = 'src/index.js';
  for (let key in temp) {
    temp[key] = temp[key].replace('./', '')
  }
  return temp
}


/**
 * 执行进程任务
 * @param {String} name 文件名称
 * @param {String} path 文件路径
 */
async function syncExex(name = '', path = '') {
  if (!name || !path) {
    console.warn("The parameter is invalid");
    return
  }
  let result = { name, path, num: 1, message: 'success' };

  const shell = `vue-cli-service build --target lib --name ${name} --dest lib ${path} --formats commonjs`;

  console.log("\033[33m[start]: " + shell)
  console.log("\033[0m");

  const { stdout, stderr, error } = await exec(shell);
  if ([null, undefined].includes(error)) {
    console.log('stdout:', stdout);
    return result
  }

  console.warn('error:', error);

  result.num = 0;
  result.message = 'fail';
  return result;
}

/**
 * 跑批量打包命令
 */
async function runLibComponent() {
  const shellObject = formatComponentObject();

  let path = '';
  let resultList = [];

  const shellLen = Object.keys(shellObject).length;

  for (let name in shellObject) {
    path = shellObject[name];
    let result = await syncExex(name, path);
    resultList.push(result);
  }
  
  const success = resultList.filter(item => item.num);
  const fail = resultList.filter(item => !item.num);

  console.log("\033[33m");
  console.table(resultList);
  console.log("\033[0m");
  
}

runLibComponent()
