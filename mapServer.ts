const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const HOST = '127.0.0.1'
const PORT = 22222

app.use(express.static(path.resolve('./roadmap')))

app.listen(PORT, HOST, () => {
    console.log('server run')
})