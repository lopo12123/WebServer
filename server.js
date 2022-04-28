const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const session = require('express-session')

const HOST = '127.0.0.1'
const PORT = 8888

// app.set('trust proxy', 1)
// app.use(cookieSession({
//     name: 'SessionId',
//     keys: ['key1', 'key2']
// }))
// app.use((req, res, next) => {
//     req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
//     next()
// })

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
})

app.use(session({
    name: 'sessionId',
    secret: 'salt',
    cookie: {
        maxAge: 30000
    },
    resave: false,
    saveUninitialized: false,
}))

// Access the session as req.session
app.get('/', function(req, res, next) {
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})

app.get('/ping', (req, res) => {
    res.json({
        msg: 'get ping'
    })
})

app.get('/base64', (req, res) => {
    const str = fs.readFileSync('./img.jpg', {encoding: 'base64'})
    res.send(str)
})

app.listen(PORT, HOST, () => {
    console.log('server run')
})