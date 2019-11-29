var app = require('express')();
var server = require('http').createServer();
server.on('request', app)
var io = require('socket.io')(server)


app.get('/', function(req, res){

});

io.on('connection', function(socket){
  console.log('a user connected');
});

server.listen(3008, function(){
  console.log('listening on *:3000');
});