const express = require('express')
const app = express()

const HOST = '127.0.0.1'
const PORT = 3000

app.get('/', (req, res) => {
    res.send("hi there!")
})

app.post('/', (req, res) => {
    res.send('hi there, post')
})

app.listen(PORT, HOST, () => {
    console.log('start at %s:%d', HOST, PORT)
})