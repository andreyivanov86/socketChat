const app = require('express')();
const http = require('http').Server(app);
const logging = require('volleyball');
const io = require('socket.io')(http);

app.use(logging);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', msg => {
    console.log(`message ${msg}`)
  });

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

http.listen(3000, () => {
  console.log('listen on port 3000...')
})
