const express = require('express')
const cors = require('cors')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(cors());

app.use(express.static('src'))

let messages = [{
  id: 1,
  text: 'Lorem ipsum dolor',
  name: 'Bot'
}]

io.on('connection', (socket) => {
  console.log('Un nuevo cliente se ha conectado: '+socket.handshake.address)
  socket.emit('messages', messages)
  socket.on('add-message', (data) => {
    messages.push(data)
    io.sockets.emit('messages', messages)
  })
})

server.listen(3080, () => {
  console.log('listen on port 3080')
})