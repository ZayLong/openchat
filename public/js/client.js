(function(){
  var socket = io();
  $container = $('.chatPanel');
  $container[0].scrollTop = $container[0].scrollHeight; 

  $('form').submit(function(){
    var text = $('#trueCheck').text();
    if(text == 'true' && $('#m').val()){
      socket.emit('chat message', $('#m').val());
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
});

function connect(){
  socket.emit('login', $('#m').val());
}

})();
