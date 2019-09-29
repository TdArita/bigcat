var net = require('net')
var querystring = require('querystring')
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

var server = net.createServer()

var port = 8080

var responseText
var inner
var xhr = new XMLHttpRequest()
xhr.onreadystatechange = function() {
  console.log("State: " + this.readyState);
	
	if (this.readyState === 4) {
    // console.log("Complete.\nBody length: " + this.responseText.length);
    // console.log("Body:\n" + this.responseText);
    responseText = JSON.parse(this.responseText).map(it => it.url).map((it) => {return 'http://xieranmaya.github.io/images/cats/' + it}).map((it) => {
      return `<img src=${it}>`
    })
    inner = responseText.reduce(function(it, cur){
      return it + cur
    }, '')
    console.log(inner)
	}
};
xhr.open('GET', 'http://xieranmaya.github.io/images/cats/cats.json')
// xhr.responseType = 'json'
xhr.send()

server.on('connection', conn => {
  conn.on('data', data => {
    if (true || method == 'GET'){
      conn.write('HTTP/1.1 200 OK\r\n')
      conn.write('Content-Type: text/html; charset=UTF-8\r\n')
      conn.write('Date: ' + new Date().toString() + '\r\n')
      conn.write('\r\n')
      conn.write(inner)
      conn.end()
    }
  })
})



server.listen(port, () =>{
  console.log('server listening on port', port)
})