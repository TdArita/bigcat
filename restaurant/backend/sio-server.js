const socketIO = require('socket.io')

module.exports.srestaurant = socketIO({
  path: '/restaurant'
})

module.exports.sdesk = socketIO({
  path: '/desk'
})