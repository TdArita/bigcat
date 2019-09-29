const fs = require('fs')
const fsp = fs.promises


/**
 * 接收一个文件夹路径，返回这个文件夹里面的所有文件名
 * 需要递归的得到所有的文件名 并放在一个一维数组里返回
 * 需要写三个版本：
 * 同步版
 * 回调版
 * Promise版本
 */
var result = ['Sync']
function listAllFilesSync(dirPath) {
  var list = fs.readdirSync(dirPath)
  for (let i = 0; i < list.length; i++) {
    if(fs.statSync(dirPath + '/' + list[i]).isFile()){
      result.push(list[i])
    }else if(fs.statSync(dirPath + '/' + list[i]).isDirectory()){
      listAllFilesSync(dirPath + '/' + list[i])
    }
  }
  result = [].concat(...result)
}
listAllFilesSync('C:/Users/汤德安/Desktop/miao/small-work')
console.log(result)





var resultcb = ['callback']
var listAllFilesCallback = function(dirPath) {
  fs.readdir(dirPath, {withFileTypes: true}, (err, filesList) => {
    if (err) {
      return err
    }else{
      for (let i = 0; i < filesList.length; i++) {
        if(filesList[i].isFile()){
          resultcb.push(filesList[i].name)
          resultcb = [].concat(...resultcb)
          if (i == (filesList.length - 1)) {
            console.log(resultcb)
          }
        }else if (filesList[i].isDirectory()) {
          listAllFilesCallback(dirPath + '/' + filesList[i].name)
        }
      }
    }
  })
}
listAllFilesCallback('C:/Users/汤德安/Desktop/miao/small-work')



function listAllFilesPromise(dirPath) {
  var result = []
  return fsp.stat(dirPath).then(stat => {
    if (stat.isFile()) {
      return [dirPath]
    } else {
      return fsp.readdir(dirPath, {withFileTypes: true}).then(filesName => {
        
      })
    }
  })
}


listAllFilesPromise('C:/Users/汤德安/Desktop/miao/small-work')