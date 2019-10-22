const socketIO = require('socket.io')

const http = require('http')

const server = http.createServer()

const ioServer = socketIO(server)

ioServer.on('connection', ws => {

  console.log('someone connected')

  ws.on('hello', msg => {
    ws.send({a:1})
  })

  ws.on('error', () => {})

})

server.on('request', (req, res) => {
  if (req.method == 'GET' && req.url == '/') {
    res.end(`
      <script src="/socket.io/socket.io.js"></script>
      <script>
        var socket = io();
      </script>
    `)
  }
})


server.listen(3007, () => {console.log(3007)})