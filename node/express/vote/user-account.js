const express = require('express')
let db
const dbPromise = require('./db')
dbPromise.then(dbObject => {
  db = dbObject
})

const app = express.Router()

var changePasswordToken = {}


app.route('/register')
  .get((req, res, next) => {
    res.send(`
      <form action="/register" method="post">
        <span>用户名：</span><input type="text" name="name"><br>
        <span>邮箱：</span><input type="text" name="email"><br>
        <span>密码：</span><input type="password" name="password"><br>
        <button type="submit" value="submit">注册</button>
      </form>
    `)
  })
  .post(async (req, res, next) => {
    var regInfo = req.body
    var user = await db.get('SELECT * FROM users WHERE name=?', regInfo.name)
    if(user){
      res.end('账户已存在')
    } else {
      db.run('INSERT INTO users (name, email, password) VALUES(?,?,?)', regInfo.name, regInfo.email, regInfo.password)
      res.set('Content-Type', 'text/html; charset:UTF-8')
      res.end('账户创建成功')
    }
  })

app.route('/login')
  .get((req, res, next) => {
  res.send(`
    <form action="/login" method="post">
      <span>用户名：</span><input name="name" type="text"><br>
      <span>密码：</span><input name="password" type="password"><br>
      <button type="submit" value="submit">登录</button>
    </form>
    <a href="/forgot"><button>忘记密码</button></a>
      `)
})
  .post(async (req, res, next) => {
    var userInfo = req.body
    var user = await db.get('SELECT * FROM users WHERE name=?', userInfo.name)
    if(user && req.body.password == user.password){
      res.cookie('userid', user.id, {
        signed: true
      })
      res.redirect('/')
      next()
    } else {
      res.send('账户或密码错误')
    }
  })

app.route('/forgot')
  .get((req, res, next) => {
    res.send(`
      <form action="/forgot" method="post">
      <span>请输入您的邮箱：</span><input type="text" name="email"/>
      <button type="submit">发送</button>
      </form>
    `)
})
  .post((req, res, next) => {
    var email = req.body.email
    var token = Math.random().toString().slice(2)
    changePasswordToken[token] = email
    setTimeout(() => {
      delete changePasswordToken.token
    }, 1000*60*20)
    console.log('http://localhost:3005/change-password/' + token)
    res.set('Content-Type', 'text/html; charset:UTF-8')
    res.end('修改密码链接已发送到您的邮箱')
})

app.route('/change-password/:token')
  .get((req, res, next) => {
    var token = req.params.token
    if(changePasswordToken[token]){
      res.send(`
      <form action="" method="post">
      <span>请输入新密码：</span><input name="password" type="text">
      <button type="submit">确认</button>
      </form>
      `)
    }else{
      res.set('Content-Type', 'text/html; charset:UTF-8')
      res.end('链接已失效')
    }
  })
  .post(async (req, res, next) => {
    var token = req.params.token
    var email = changePasswordToken[token]
    var newPassword = req.body.password
    await db.run('UPDATE users SET password=? WHERE email=?', newPassword, email)
    res.set('Content-Type', 'text/html; charset:UTF-8')
    res.end('修改密码成功')
  })

app.get('/logout', (req, res, next) => {
  console.log(req.signedCookies)
  res.clearCookie('userid')
  res.redirect('/')
  next()
})

module.exports = app