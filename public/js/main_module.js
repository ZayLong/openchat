//This is all client side stuff

(function(){
	var main = angular.module('chat', []);

	main.controller('chatController', function($scope){
		$scope.connected = false;
		var socket = io();
  		$container = $('.chatPanel');
  		$container[0].scrollTop = $container[0].scrollHeight; 

		$scope.connect = function(){
			if($scope.connected == false)
			{
				$scope.connected = true;
				if($scope.connected){
					socket.emit('login', $('#username').val());	
				}

			}
			
		}

		 $('form').submit(function(){
			    var text = $('#trueCheck').text();
			    if(text == 'true' && $('#m').val()){
			      socket.emit('chat message', $('#username').val() + ": " + $('#m').val());
			    $('#m').val('');
			    return false;
			    }
			});

			 socket.on('chat message', function(msg){
			  $('#messages').append($('<li>').text(msg));
			  $container.animate({ scrollTop: $container[0].scrollHeight }, "slow");
			});

			socket.on('room message', function(msg){
			   $('#messages').append($('<li>').text(msg));
			    $container.animate({ scrollTop: $container[0].scrollHeight }, "slow");
			});

			socket.on('disconnect', function(name){
				name = $('#username').val();
			});




	});
})();
