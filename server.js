const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const HOST = '0.0.0.0'
const PORT = 80

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './wx_login.html'))
})

app.get('/redirect', (req, res) => {
    res.redirect('http://不存在的url地址')
})

app.get('/wx/callback', (req, res) => {
    console.log(req.body)
    console.log(req.params)

    res.sendFile(path.join(__dirname, './param_display.html'))
})

app.listen(PORT, HOST, () => {
    console.log('server established!')
})
