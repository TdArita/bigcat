var http = require('http');
var url = require('url');
var util = require('util');
var path = require('path')
var fs = require('fs')
const port = 8090
var basedir = __dirname


console.log(1)
var resText
fs.readdir("/Users/汤德安/Desktop/miao", (err, files) => {
  if (err) {
    return console.log(err)
  }else{
    console.log(files)
    allFile = files
    if (files.indexOf('index.html') > -1) {
      fs.open
    }
  }
})


// console.log("查看 /tmp 目录");
// fs.readdir("/tmp/",function(err, files){
//    if (err) {
//        return console.error(err);
//    }
//    files.forEach( function (file){
//        console.log( file );
//    });
// });

http.createServer(function(req, res){
    var targetPath = path.join(basedir, req.dir)
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(` `)
    res.end(util.inspect(url.parse(req.url, true)));
    fs.stat(targetPath, (err,stat) => {
      if (err) {
        
      } else {
        if (stat) {
          
        }
      }
    })
}).listen(3000);