const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { deleteDir, renameFiles } = require('./file')
const Components = require('../components.json');
const LIB_PATH = __dirname.replace('bin', 'lib');
const FORMAT_ARRAY = ['es', 'cjs'];

/**
 * 格式化组件
 */
const formatComponentObject = () => {
  let temp = Components;
  temp['index'] = 'src/index.js';
  for (let key in temp) {
    temp[key] = temp[key].replace('./', '')
  }
  return temp
}

const getComponentsList = () => {

  const componentsObject = formatComponentObject();

  const componentsKey = Object.keys(componentsObject);

  return FORMAT_ARRAY.reduce((result, format) => {
    componentsKey.map(key => {
      result.push({
        input: componentsObject[key],
        format,
        output: `${format === "es" ? "lib/esm" : "lib"}/${key}.js`,
      })
    })
    return result
  }, [])

}
/**
 * 执行进程任务
 * @param {String} name 文件名称
 * @param {String} path 文件路径
 */
async function syncExex(input = '', output = '', format = 'esm') {
  if (!input || !output) {
    console.warn("The parameter is invalid");
    return
  }
  let result = { input, output, format, num: 1, message: 'success' };

  const shell = `rollup -c -f ${format} -i ${input} -o ${output} `

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
  return result
}

/**
 * 跑批量打包命令
 */
function runLibComponent() {
  return new Promise(async (resolve, reject) => {

    const componentsList = getComponentsList();

    let currentComponent = '';
    let resultList = [];

    for (let i = 0, len = componentsList.length; i < len; i++) {
      currentComponent = componentsList[i];
      let result = await syncExex(currentComponent.input, currentComponent.output, currentComponent.format);
      resultList.push(result);
    }

    const success = resultList.filter(item => item.num);

    const fail = resultList.filter(item => !item.num);

    console.log("\033[33m");
    console.table(resultList);
    console.log("\033[0m");

    resolve()
  })

}

/**
 * 清除所有文件
 */
deleteDir(LIB_PATH)

runLibComponent();