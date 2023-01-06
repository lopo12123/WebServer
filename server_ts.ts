// @ts-nocheck
const express = require('express')
const bodyParser = require('body-parser')

import { CatalystplusCrypto } from "./CatalystplusCrypto";

const app = express()

const HOST = '0.0.0.0'
const PORT = 3333

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
})

app.post('/crypto/encode', (req, res) => {
    const source_to_encode = req.body.source

    res.json({ encoded: CatalystplusCrypto.encode(source_to_encode) })
})
app.post('/crypto/decode', (req, res) => {
    const source_to_decode = req.body.source

    res.json({ decoded: CatalystplusCrypto.decode(source_to_decode) })
})

app.listen(PORT, HOST, () => {
    console.log('server established!')
})
