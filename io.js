const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const HOST = "127.0.0.1"
const PORT = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/io.html')
})

io.on('connection', (socket) => {
    socket.emit('open')
    socket.on('sayHello', (msg) => {
        console.log('get msg from sayHello: ', msg)
    })
})

server.listen(PORT, HOST, () => {
    console.log('server run at %s:%d', HOST, PORT)
})