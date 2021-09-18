const express = require('express')
const app = express()

const HOST = '127.0.0.1'
const PORT = 3000

app.get('/', (req, res) => {
    res.send("hi there!")
})

app.listen(PORT, HOST, () => {
    console.log('server run at %s:%d now （press Ctrl+C to exit）', HOST, PORT)
})