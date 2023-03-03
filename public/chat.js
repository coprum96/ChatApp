document.addEventListener('DOMContentLoaded', () => {
    // Make connection
    const socket = io.connect('http://localhost:3000');
  
    // Get references to DOM elements
    const message = document.querySelector('#message');
    const username = document.querySelector('#username');
    const send_message = document.querySelector('#send_message');
    const send_username = document.querySelector('#send_username');
    const chatroom = document.querySelector('#chatroom');
    const feedback = document.querySelector('#feedback');
    const sticker = document.querySelector('#sticker');
  
    // Emit message
    send_message.addEventListener('click', () => {
      socket.emit('new_message', { message: message.value });
    });
  
    // Listen on new_message
    socket.on('new_message', (data) => {
      feedback.innerHTML = '';
      message.value = '';
      chatroom.innerHTML += "<p class='message'>" + data.username + ": " + data.message + '</p>';
    });
  
    // Emit a username
    send_username.addEventListener('click', () => {
      socket.emit('change_username', { username: username.value });
    });
  
    // Emit typing
    message.addEventListener('keypress', () => {
      socket.emit('typing');
    });
  
    // Listen on typing
    socket.on('typing', (data) => {
      feedback.innerHTML = "<p><i>" + data.username + ' is typing a message...</i></p>';
    });
  });




  
  