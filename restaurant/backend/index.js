const app = require('./app')
const server = require('./http-server')
const io = require('./io-server')

const port = 5000

server.on('request', app)
io.restaurant.attach(server)
io.desk.attach(server)


server.listen(port, () => {
  console.log('server listening on port', port)
})