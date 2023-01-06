const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const HOST = '0.0.0.0'
const PORT = 3333

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
})

app.post('/crypto', (req, res) => {
    console.log(req.body)

    res.json({ name: 123 })
})

app.listen(PORT, HOST, () => {
    console.log('server established!')
})
