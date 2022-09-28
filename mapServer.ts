const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()

const HOST = '0.0.0.0'
const PORT = 8888

// app.use(express.static(path.resolve('./roadmap')))
app.use(express.static(path.resolve('./dist')))

app.listen(PORT, HOST, () => {
    console.log('server run')
})