const express = require('express');
var app = express();

const path = require('path')
const PORT = process.env.PORT || 5000
const http = require('http').Server(app);
const io = require('socket.io')(http);

  app.use(express.static(path.join(__dirname, 'public')))
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')
  app.get('/', (req, res) => res.render('index'))
  http.listen(PORT, function() {console.log(`Listening on ${ PORT }`);});
app.get('/', function (req,res){
    res.sendFile(__dirname + '/index.ejs');
});
app.get ('/about',function(req,res){
  res.sendFile(__dirname+'about.ejs');
});
  io.on('connection', function(socket){
    socket.on('playerEvent', function(msg){
      console.log(msg);
      io.sockets.emit('play/pause',msg);
    }
  );
    console.log('a user connected:');
    socket.on('time', function(time){
      console.log(time);
      io.sockets.emit('settime',time);
    })

  });
