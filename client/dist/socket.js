// import io from 'socket.io-client';

// socket connection test
const socket = io.connect('http://localhost:80');

socket.emit('hi', 'some shit');

socket.on('state', (data) => {
  console.log(data);
});
