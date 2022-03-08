const express = require('express')
const app = express()

const HOST = '127.0.0.1'
const PORT = 8910

app.get('/', (req, res) => {
    setTimeout(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('done')
    }, 5_000)
})

app.get('/cookie', (req, res) => {
    console.log('GET cookie')
    res.send('done')
})

app.listen(PORT, HOST, () => {
    console.log('server run at %s:%d now （press Ctrl+C to exit）', HOST, PORT)
})