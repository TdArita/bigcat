const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userAccountMiddleware = require('./user-account')
const restaurantMiddleware = require('./restaurant')

const port = 5000

const app = express()

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.use(cors({
  origin: true,
  maxAge: 86400,
  credentials: true,
}))

app.use(cookieParser('secret'))

app.use(express.static(__dirname + '/static/')) //处理静态文件
app.use('/upload', express.static(__dirname + '/upload/')) //处理静态文件
app.use(express.urlencoded({extended:true})) //解析扩展url编码
app.use(express.json()) //解析json请求体

app.use('/api', userAccountMiddleware)
app.use('/api', restaurantMiddleware)

app.listen(port, () => {
  console.log('server listen on', port)
})