const app = require('./app')
const server = require('./http-server')
const httpsServer = require('./https-server')
const io = require('./io-server')
const sio = require('./sio-server')

const port = 5000
const httpsPort = 5443

server.on('request', app)
httpsServer.on('request', app)
io.restaurant.attach(server)
io.desk.attach(server)
sio.srestaurant.attach(httpsServer)
sio.sdesk.attach(httpsServer)

server.listen(port, () => {
  console.log('server listening on port', port)
})

httpsServer.listen(httpsPort, () => {
  console.log('httpsServer listening on port', httpsPort)
})