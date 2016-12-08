var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.broadcast.emit('user c', socket.id + ' connected');
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    console.log('a user disconnected');
    socket.broadcast.emit('user dc', socket.id + ' disconnected');
  });
  socket.on('login', function(name){
    console.log('Name: ', name);
    socket.id = name;
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
