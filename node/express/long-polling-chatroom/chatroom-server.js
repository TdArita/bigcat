const express = require('express')

const app = express()
const port = 3006

var pendingResponse = []

app.get('/', (req, res, next) => {
  res.response
})