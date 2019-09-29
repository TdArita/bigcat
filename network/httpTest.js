var net = require('net')

var server = net.createServer()

var port = 8080



server.on('connection', conn => {

  conn.on('data', data => {
    conn.write(
`HTTP/1.1 200 OK
Content-Type: text/html
Date: ${new Date().toISOString()}

<h1>hello</h1>`)
    conn.end()
  })
})

server.listen(port, () => {
  console.log('server listening on port', port)
})

// var net = require('net')

// var server = net.createServer()

// var port = 80

// var pages = {
//   '/hello': `
//     <h1>hello</h1>
//   `,
//   '/world.html': `
//     <h1>hello</h1>
//     <h2>world</h2>
//   `
// }
// // http://localhost:8080/

// server.on('connection', conn => {

//   conn.on('data', data => {
//     var path = data.toString().split('\r\n')[0].split(' ')[1]
//     console.log(path)
//     conn.write(
// `HTTP/1.1 200 OK
// Content-Type: text/html
// Date: ${new Date().toISOString()}

// <h1>hello, now is ${new Date().toLocaleString()}</h1>`)
//     conn.end()
//   })

// })

// server.listen(port, () => {
//   console.log('server listening on port', port)
// })

HTTP/1.1 400 Error
Content

GET / HTTP/1.1

http://www.XXX.com/example/MessageChannel.html?name=a&message=b

GET /example/MessageChannel.html?name=a& HTTP/1.1
Host: xxx.com
User-Agent: xxx


POST / HTTP/1.1
host: loaclhost
User-Agent: xxx

name=b&message