const fs = require('fs')
const multer = require('multer')
const md5 = require('md5')
const express = require('express')
const sharp = require('sharp')
const svgCaptcha = require('svg-captcha')
const fsp = fs.promises
const uploader = multer({
  dest: './upload/',
  preservePath: true,
})

let db
(async function(){
  db = await require('./db')
}())


const changePasswordTokenMap = {}
const mailer = require('./mailer')

const app = express.Router()



app.route('/register')
  .post(uploader.single('avatar'), async (req, res, next) => {
    var regInfo = req.body

    console.log(regInfo)
    var user = await db.get('SELECT * FROM users WHERE name=?', regInfo.name)

    if (user) {

      if (req.file) {
        await fsp.unlink(req.file.path)
      }

      res.status(401).json({
        code: -1,
        msg: '用户名已被占用'
      })

    } else {

      await db.run('INSERT INTO users (name, email, password, title) VALUES (?,?,?,?)',
        regInfo.name, regInfo.email, regInfo.password, regInfo.title
      )

      res.json({
        code: 0,
        msg: '注册成功'
      })
    }
  })

app.get('/captcha', (req, res, next) => {
  var captcha = svgCaptcha.create({
    ignoreChars: '0o1il'
  })
  res.type('svg')
  req.session.captcha = captcha.text
  console.log(req.session)

  res.end(captcha.data)
})

app.get('/userinfo', async (req, res, next) => {
  var userid = req.signedCookies.userid
  console.log('userid='+userid)
  if (userid) {
    res.json(await db.get('SELECT id,name,title FROM users WHERE id=?', userid))
  } else {
    res.status(404).json({
      code: -1,
      msg: '不存在此餐厅'
    })
  }
})

app.route('/login')
  .post(async (req, res, next) => {
    var tryLoginInfo = req.body
    console.log(tryLoginInfo)
    if (tryLoginInfo.captcha != req.session.captcha) {
      res.json({code: -1, msg: '验证码错误'})
      return
    }
    var user = await db.get('SELECT id, name, title FROM users WHERE name=? AND password=?',
      tryLoginInfo.name, tryLoginInfo.password
    )
    if (user) {
      res.cookie('userid', user.id, {
        signed: true
      })
      res.json(user)
    } else {
      res.status(403).json({code: -1, msg: '用户名或密码错误'})
    }
  })

app.route('/forgot')
  .post(async (req, res, next) => {
    var email = req.body.email
    var user = await db.get('SELECT * FROM users WHERE email=?', email)
    if (!user) {
      res.json({
        code: -1,
        msg: '不存在此用户'
      })
    }

    var token = Math.random().toString().slice(2)

    changePasswordTokenMap[token] = email

    setTimeout(() => {
      delete changePasswordTokenMap[token]
    }, 60 * 1000 * 20)//20分钟后删除token

    var link = `http://localhost:3005/change-password/${token}`

    console.log(link)

    mailer.sendMail({
      from: '601619508@qq.com',
      to: email,
      subject: '密码修改',
      text: link
    }, (err, info) => {
      res.json({
        code: 0,
        msg: '已向您的邮箱发送密码重置链接，请于20分钟内点击链接修改密码！'
      })
    })
  })

app.route('/change-password/:token')
  // .get(async (req, res, next) => {
  //   var token = req.params.token
  //   var name = changePasswordTokenMap[token]

  //   if (!name) {
  //     res.end('链接已失效')
  //     return
  //   }

  //   // var user = await db.get('SELECT * FROM users WHERE')

  //   res.end(`
  //     此页面可以重置${name}的密码
  //     <form action="" method="post">
  //       <input type="password" name="password"/>
  //       <button>提交</button>
  //     </form>
  //   `)
  // })
  .post(async (req, res, next) => {
    var token = req.params.token
    var email = changePasswordTokenMap[token]
    var password = req.body.password

    if (!email) {
      res.json({
        code: -1,
        msg: '链接已失效'
      })
      return
    }

    delete changePasswordTokenMap[token]
    
    await db.run('UPDATE users SET password=? WHERE email=?', md5(md5(password)), email)

    res.end({
      code: 0,
      msg: '密码修改成功'
    })
  })

app.get('/logout', (req, res, next) => {
  res.clearCookie('userid')
  res.json({
    code: 0,
    msg: '登出成功'
  })
})

module.exports = app
