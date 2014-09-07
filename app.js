//Server side Script
//set up the server
var express = require('express');
var app = express();
var http = require('http').Server(app);

var port = 9500;

//create an instance of socket.io and attach it to our http server
var io = require('socket.io')(http); 

//set up the directories to static files

app.use(express.static(__dirname + '/public'));

//serve the main web page to the client
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


//this is an event that fires when a connection is made
io.on('connection', function(socket){

	socket.on('login', function(name){
		socket.username = name;
		console.log('a user connected');
  		socket.broadcast.emit('room message', socket.username +" has joined the room!");
	});
  

	  socket.on('disconnect', function(){
	  

	   
		  	console.log('user disconnected');
  			socket.broadcast.emit('room message', socket.username + " has left the room!");
		
	    

	  });

	  socket.on('chat message', function(msg){
	    io.emit('chat message', msg);
	  });

	  socket.on('room message', function(msg){
	    io.emit('room message', msg);
	  });

});

	
//set the port to listen to
http.listen(port, function(){
	console.log('listening on *:' + port);
});

