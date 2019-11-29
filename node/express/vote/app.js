const express = require('express')
const socketIO = require('socket.io')
const cookieParser = require('cookie-parser')
const http = require('http')
const url = require('url')
const session = require('express-session')

const userAccountRouter = require('./user-account')

const app = express()
const server = http.createServer(app)
const ioServer = socketIO(server)

const port = 3005


app.locals.pretty = true

app.set('views', __dirname + '/tpl')



app.use(express.static(__dirname + '/static'))
app.use(session({secret: 'my secret parse'}))
app.use(cookieParser('my secret parse'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

ioServer.on('connection', socket => {
  var path = url.parse(socket.request.headers.referer).path
  socket.join(path)
})

app.route('/', (req, res, next) => {
  res.set('Content-Type', 'text/html; charset:UTF-8')
  next()
})

app.get('/', (req, res, next) => {
  console.log(req)
  if(req.signedCookies.userid){
    res.send(`
      <div>
        欢迎${req.signedCookies.userid}<br>
        <a href="/create.html"><button>发起投票</button></a>
        <a href="/vote-history"><button>我的投票</button></a>
        <a href="/logout"><button onclick="clearCoocie">登出</button></a>
      </div>
      <script>
        function clearCookie(){
          document.cookies
        }
      </script>
    `)
  }else{
    res.send(`
      <div>
        <a href="/register">注册</a>
        <a href="/login">登录</a>
      </div>
    `)
  }
  next()
})

app.use('/', userAccountRouter)

app.post('/create-vote', async (req, res, next) => {
  var voteInfo = req.body
  var userid = req.signedCookies.userid
  console.log(req.body)
  console.log(req.signedCookies.userid)
  await db.run('INSERT INTO votes (title, desc, userid, singleSelection, deadline, anonymous) VALUES (?,?,?,?,?,?)', 
    voteInfo.title, voteInfo.desc, userid, voteInfo.singleSelection, new Date(voteInfo.deadline).getTime(), voteInfo.anonymous
  )
  var vote = await db.get('SELECT * FROM votes ORDER BY id DESC LIMIT 1')
  await Promise.all(voteInfo.options.map(option => {
    return db.run('INSERT INTO options (content, voteid) VALUES (?,?)', option, vote.id)
  }))
  res.set('Content-Type', 'text/html; charset:UTF-8')
  res.end(`
    投票已创建，编号为 ${vote.id} <a href="/vote/${vote.id}">点击立即跳转投票页面</a>
    <a href="/">返回首页</a>
  `)
})

app.get('/vote/:id', async (req, res, next) => {
  var votePromise = db.get('SELECT * FROM votes WHERE id=?', req.params.id)
  var optionsPromise = db.all('SELECT * FROM options WHERE voteid=?', req.params.id)

  var vote = await votePromise
  var options = await optionsPromise

  res.render('vote.pug', {
    vote: vote,
    options: options
  })
})


app.get('/vote-history', async (req, res, next) => {
  var userid = req.signedCookies.userid
  var votes = await db.all('SELECT * FROM votes WHERE userid=?', userid)
  votes = votes.map(it => `<li><a href="/vote/${it.id}">您的第${it.id}号投票</a></li>`)
  var innerhtml = votes.reduce((bef, curr) => {
    return bef + curr
  },'')
  res.send(`
  <a href="/">返回首页</a>
  ${innerhtml}
  `)
})

app.post('/voteup', async (req, res, next) => {
  var userid = req.signedCookies.userid
  var body = req.body
  var voteid = body.voteid



  var voteupInfo = await db.get('SELECT * FROM voteups WHERE userid=? AND voteid=?', userid, body.voteid)
  if (voteupInfo){
    // return res.end()
    await db.run('UPDATE voteups SET optionid=? WHERE userid=? AND voteid=?', body.optionid, userid, body.voteid)
  } else {
    await db.run('INSERT INTO voteups (userid, optionid, voteid) VALUES (?,?,?)', 
      req.signedCookies.userid, req.body.optionid, req.body.voteid
    )
  }

  ioServer.in(`/vote/${voteid}`).emit('new vote', {
    userid,
    voteid,
    optionid: body.optionid
  })


  var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?', req.body.voteid)
  res.json({voteups})
})

app.get('/voteup/:voteid/info', async(req, res, next) => {
  var userid = req.signedCookies.userid
  var voteid = req.params.voteid
  var userVoteupInfo = await db.get('SELECT * FROM voteups WHERE userid=? AND voteid=?', userid, voteid)
  if(userVoteupInfo) {
    var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?', voteid)
    res.json(voteups)
  } else {
    res.json(null)
  }
})


let db
const dbPromise = require('./db')
dbPromise.then(dbObject =>{
  db = dbObject
  server.listen(port, () => {
    console.log('server listing port', port)
  })
})

