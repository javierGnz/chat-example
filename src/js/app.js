// Cambiar IP dependiendo de la conexión que uno tenga
const socket = io.connect('http://192.168.1.176:3080', {'forceNew': true})
const messageContainer = document.getElementById('messages')

let userName

socket.on('messages', (data) => {
  console.log(data)
  render(data)
})

const closeModal = () => {
  userName = document.getElementById('name').value
  document.querySelector('.modal').remove()
}

const render = (data) => {
  let html = data.map((message, index) => {
    let user = message.name;
    return (`
      <div class="item">
        <h4 class="item-user">${user.substring(0, 1).toUpperCase()}</h4>
        <p class="item-text">${message.text}</p>
      </div>
    `)
  }).join(' ')

  messageContainer.innerHTML = html
  messageContainer.scrollTop = messageContainer.scrollHeight
}

const addMessage = (e) => {
  let message = {
    name: userName,
    text: document.getElementById('sendMessage').value,
  }
  document.getElementById('sendMessage').value = ''
  socket.emit('add-message', message)

  return false
}