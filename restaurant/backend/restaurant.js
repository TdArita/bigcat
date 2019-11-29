const express = require('express')
const multer = require('multer')
const path = require('path')
const io = require('./io-server')

io.restaurant.on('connection', socket => {
  console.log('restaurant client in', socket.handshake.query)
  var restaurant = socket.handshake.query.restaurant
  socket.join(restaurant)
})

var deskCartMap = new Map()
io.desk.on('connection', socket => {
  console.log('desk client in', socket.handshake.query)
  var desk = socket.handshake.query.desk
  if(!desk){
    socket.close()
    return
  }
  socket.join(desk)
  
  socket.on('join desk', desk => {
    console.log('join desk', desk)
    socket.join(desk)

    var cartFood = deskCartMap.get(desk)
    if(!cartFood) {
      deskCartMap.set(desk, [])
    }
    socket.emit('cart food', cartFood || [])
  })

  socket.on('new food', info => {
    var foodAry = deskCartMap.get(info.desk)
    console.log(info)

    var idx = foodAry.findIndex(it => it.food.id === info.food.id)
    if(idx >= 0) {
      if(info.amount === 0){
        foodAry.splice(idx, 1)
      }else {
        foodAry[idx].amount = info.amount
      }
    } else {
      foodAry.push({
        food: info.food,
        amount: info.amount
      })
    }
  
    io.desk.in(info.desk).emit('new food', info)
  })
})

/*
ioServer.on('connection', socket => {
  console.log('socket connect')

  socket.on('join restaurant', restaurant => {
    socket.join(restaurant)
  })

  socket.on('join desk', desk => {
    console.log('join desk', desk)
    socket.join(desk)

    var cartFood = deskCartMap.get(desk)
    if(!cartFood) {
      deskCartMap.set(desk, [])
    }
    socket.emit('cart food', cartFood || [])
  })

  socket.on('new food', info => {
    var foodAry = deskCartMap.get(info.desk)
    console.log(info)

    var idx = foodAry.findIndex(it => it.food.id === info.food.id)
    if(idx >= 0) {
      if(info.amount === 0){
        foodAry.splice(idx, 1)
      }else {
        foodAry[idx].amount = info.amount
      }
    } else {
      foodAry.push({
        food: info.food,
        amount: info.amount
      })
    }
  
    ioServer.in(info.desk).emit('new food', info)
  })
})
*/

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './upload/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const uploader = multer({storage: storage})

let db
(async function(){
  db = await require('./db')
}())

const app = express.Router()


// 用户侧api
//获取餐厅信息
app.get('/deskinfo', async (req, res, next) => {
  var desk = await db.get(`
    SELECT
      desks.id as did,
      users.id as uid, 
      desks.name, 
      users.title 
    FROM desks JOIN users 
      ON desks.rid = users.id 
    where desks.id=?`, req.query.did)

  res.json(desk)
})

//获取餐厅菜单
// CREATE TABLE foods (
//   id integer primary key,
//   rid integer not null,
//   name string not null,
//   desc string,
//   price integer not null,
//   img string,
//   category string,
//   status string not null);
app.get('/menu/restaurant/:rid', async (req, res, next) => {
  var menu = await db.all(`
    SELECT * FROM foods WHERE rid = ? AND status = 'on'
  `, req.params.rid)
  res.json(menu)
})

//用户下单
// CREATE TABLE orders (
//   id integer primary key,
//   rid integer not null,
//   did integer not null,
//   deskName string not null,
//   customCount integer not null,
//   details string not null,
//   status string,
//   timestamp string not null);
app.post('/restaurant/:rid/desk/:did/order', async (req, res, next) => {
// {
//   deskName:
//   customCount:
//   totalPrice:
//   foods: [{id, amount}, {}, {}]
// }
  var rid = req.params.rid
  var did = req.params.did
  var deskName = req.body.deskName
  var totalPrice = req.body.totalPrice
  var customCount = req.body.customCount
  var details = JSON.stringify(req.body.foods)
  var status = 'pending' //confirmed/completed
  var timestamp = new Date().toISOString()
  await db.run(`
    INSERT INTO orders (rid, did, deskName, totalPrice, customCount, details, status, timestamp)
    VALUES (?,?,?,?,?,?,?,?)
  `,
    rid, did, deskName, totalPrice, customCount, details, status, timestamp)
  var order = await db.get('SELECT * FROM orders ORDER BY id DESC LIMIT 1')
  order.details = JSON.parse(order.details)
  res.json(order)

  var desk = 'desk:' + did

  deskCartMap.set(desk, [])

  io.desk.in(desk).emit('placeorder success', order)
  io.restaurant.in('restaurant:' + rid).emit('new order', order)
})

//商户侧api

//订单管理
app.route('/restaurant/:rid/order')
  //获取订单
  .get(async (req, res, next) => {
    var orders = await db.all('SELECT * FROM orders WHERE rid=? ORDER BY timestamp DESC', req.signedCookies.userid)
    orders.forEach(order => {
      order.details = JSON.parse(order.details)
    })
    res.json(orders)
  })
  
app.route('/restaurant/:rid/order/:oid')
  //删除订单
  .delete(async (req, res, next) => {
    var order = await db.get('SELECT * FROM orders WHERE rid=? AND id=?', req.signedCookies.userid, req.params.oid)
    if (order) {
      await db.run('DELETE FROM orders WHERE rid=? AND id=?', req.signedCookies.userid, req.params.oid)
      delete order.id
      res.json(order)
    } else {
      res.status(401).json({
        code: -1,
        msg: '没有此订单或您无权限操作此订单'
      })
    }
    var orders = await db.all('SELECT * FROM orders WHERE rid=? ORDER BY timestamp DESC', req.signedCookies.userid)
    orders.forEach(order => {
      order.details = JSON.parse(order.details)
    })
    res.json(orders)
  })
  .put(async (req, res, next) => {
    console.log('change status', req.body)
    await db.run(`
      UPDATE orders SET status=?
      WHERE id=? AND rid=?
    `, req.body.status, req.params.oid, req.signedCookies.userid)
    res.json(await db.get(`SELECT * FROM orders WHERE id=?`, req.params.oid))
  })


  // app.route('/restaurant/:rid/order/:oid')
  // // 删除订单
  // .delete(async (req, res, next) => {
  //   await db.run('DELETE FROM orders WHERE id=? AND rid=?', req.params.oid, req.signedCookies.userid)
  //   res.end()
  // })
  
  app.route('restaurant/:rid/order/:oid/status')
  // 修改订单状态
  




//菜品管理api
// CREATE TABLE foods (
//   id integer primary key,
//   rid integer not null,
//   name string not null,
//   desc string,
//   price integer not null,
//   img string,
//   category string,
//   status string not null);

//先发一个post请求监测桌面和餐厅是否匹配
app.post('/restaurant/:rid/food/test', async (req, res, next) => {
  if(req.body.msg === 'test'){
    console.log('req.body.did',req.body, req.params.rid)
    var desk = await db.get(`SELECT * FROM desks WHERE id=?`, req.body.did)
    if(desk.rid !== (req.params.rid | 0)) {
      res.json({msg:'桌面错误'})
      res.end()
    }
    res.end()
  }
  next()
})

app.route('/restaurant/:rid/food')
  .get(async (req, res, next) => {
  //获取菜品
    
    var foodList = await db.all('SELECT * FROM foods WHERE rid=?', req.signedCookies.userid)
    res.json(foodList)

  })
  .post(uploader.single('img'), async (req, res, next) => {
  //增加菜品
    await db.run(`
      INSERT INTO foods (rid, name, desc, price, status, category, img) VALUES (?,?,?,?,?,?,?)
    `, 
      req.signedCookies.userid,
      req.body.name,
      req.body.desc,
      req.body.price,
      req.body.status,
      req.body.category,
      req.file.filename
     )

    var food = await db.get('SELECT * FROM foods ORDER BY id DESC LIMIT 1')

    res.json(food)
  })

app.route('/restaurant/:rid/food/:fid')
  //删除菜品
  .delete(async (req, res, next) => {
    var food = await db.get('SELECT * FROM foods WHERE id=? AND rid=?', req.params.fid, req.signedCookies.userid)
    if (food) {
      await db.run(
        'DELETE FROM foods WHERE id=? AND rid=?',
        req.params.fid, req.signedCookies.userid)
      delete food.id 
      res.json(food)
    } else {
      res.status(401).json({
        code: -1,
        msg: `不存在此菜品或无权限`
      })
    }
  })
  //修改菜品
  .put(uploader.single('img'), async (req, res, next) => {
    var fid = req.params.fid
    var userid = req.signedCookies.userid
    var food = await db.get('SELECT * FROM foods WHERE id=? AND rid=?', fid, userid)
    if (food) {
      if(req.file){
        await db.run(
            `
              UPDATE foods SET name=?, price=?, status=?, desc=?, category=?, img=?
              WHERE id=? AND rid=?
            `,
            req.body.name, req.body.price, req.body.status, req.body.desc, req.body.category, req.file.filename,
            fid, userid
          )
        } else {
          await db.run(
              `
                UPDATE foods SET name=?, price=?, status=?, desc=?, category=?
                WHERE id=? AND rid=?
              `,
              req.body.name, req.body.price, req.body.status, req.body.desc, req.body.category,
              fid, userid
            )

      }
      var food = await db.get('SELECT * FROM foods WHERE id=? AND rid=?', fid, userid)
      res.json(food)
    } else {
      res.status(401).json({
        code: -1,
        msg: `不存在此菜品或无权限`
      })
    }
  })


//桌面管理api
// CREATE TABLE desks (
//   id integer primary key,
//   rid integer not null,
//   name string not null,
//   capacity integer);
app.route('/restaurant/:rid/desk')
  .get(async (req, res, next) => {
  //获取桌面
  
    var deskList = await db.all('SELECT * FROM desks WHERE rid=?', req.signedCookies.userid)
    res.json(deskList)

  })
  .post(async (req, res, next) => {
  //增加桌面
    await db.run(`
      INSERT INTO desks (rid, name, capacity) VALUES (?,?,?)
    `, req.signedCookies.userid, req.body.name, req.body.capacity)

    var desk = await db.get('SELECT * FROM desks ORDER BY id DESC LIMIT 1')

    res.json(desk)
  })

app.route('/restaurant/:rid/desk/:did')
  //删除桌面
  .delete(async (req, res, next) => {
    var desk = await db.get('SELECT * FROM desks WHERE id=? AND rid=?', req.params.did, req.signedCookies.userid)
    if (desk) {
      await db.run(
        'DELETE FROM desks WHERE id=? AND rid=?',
        req.params.did, req.signedCookies.userid)
      delete desk.id 
      res.json(desk)
    } else {
      res.status(401).json({
        code: -1,
        msg: `不存在此桌面或无权限`
      })
    }
  })
  //修改桌面
  .put(async (req, res, next) => {
    console.log(req.body)
    var did = req.params.did
    var userid = req.signedCookies.userid
    var desk = await db.get('SELECT * FROM desks WHERE id=? AND rid=?', did, userid)
    if (desk) {
      await db.run(
          `
            UPDATE desks SET name=?, capacity=?
            WHERE id=? AND rid=?
          `,
          req.body.name, req.body.capacity, 
          did, userid
        )
      var desk = await db.get('SELECT * FROM desks WHERE id=? AND rid=?', did, userid)
      res.json(desk)
    } else {
      res.status(401).json({
        code: -1,
        msg: `不存在此桌面或无权限`
      })
    }
  })




// app.route('/restaurant/:rid/desk')
//   .get(async (req, res, next) => {
//   //获取所有桌面

//   })
//   .post(async (req, res, next) => {
//   //增加一个桌面

//   })

// app.route('/restaurant/:rid/desk/:did')
//   .delete(async (req, res, next) => {
//   //删除一个桌面

//   })
//   .put(async (req, res, next) => {
//   //修改一个桌面

//   })

module.exports = app