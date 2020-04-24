import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import api from './api'
import { produce } from 'immer'
import history from './history'
import io from 'socket.io-client'
import { Button, Card } from 'antd'


var imgStyle = {
  float: 'left',
  width: '100px',
  height: '100px',
  border: '2px solid',
}
var menuItemStyle= {
  border:'1px solid',
  padding: '5px',
  margin: '5px',
  overflow:'hidden'
}

function MenuItem({food, onUpdate, amount}) {
  // var [count, setCount] = useState(amount)
  

  function dec() {
    if(amount === 0) {
      return
    }
    // amount = (amount - 1)
    onUpdate(food, amount - 1)
  }
  function inc() {
    // amount = (amount + 1)
    onUpdate(food, amount + 1)
  }
  return (
    <Card style={menuItemStyle}>
      <h3>{food.name}</h3>
      <div>
        <img style={imgStyle} src={"/upload/" + food.img} alt={food.name}/>
        {/* <img style={imgStyle} src={"http://10.62.39.224:5000/upload/" + food.img} alt={food.name}/> */}
        <p>简介：{food.desc}</p>
        <p>价格：{food.price}元</p>
      </div>
      <div>
        <Button onClick={dec}>-</Button>
        <span>{amount}件</span>
        <Button onClick={inc}>+</Button>
      </div>
    </Card>
  )
}

MenuItem.propTypes = {
  food: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
}

MenuItem.defaultProps = {
  onUpdate: () => {},
}

// var menuFetcher = createFetcher(() => {
//   return api.get('/menu/restaurant/1')
// })



function calcTotalPrice(cartAry) {
  return cartAry.reduce((total, item) => {
    return total + item.amount * item.food.price
  }, 0)
}

function CartStatus(props) {
  var [expand, setExpend] = useState(false)

  function toggleExpand(){
    setExpend(!expand)

  }

  var totalPrice = calcTotalPrice(props.cart)

  return(
    <div style={{
      position: 'fixed',
      bottom: '0px',
      border: '1px solid',
      left: '5px',
      right: '5px',
      background: 'pink',
      // transition: 'all 0.5s'
    }}>
      {
        expand ?
        <div  style={{display:'absolute', bottom:'0'}}>
          {props.cart.map(food => (
            <div key={food.food.id}>
              <span>菜品：{food.food.name}</span>
              <br/>
              <span>数量：{food.amount}件</span>
            </div>
          ))}
        </div> :
        ''
      }
      <Button onClick={toggleExpand}>{expand ? '收起' : '展开'}</Button>
      <strong>总价： {totalPrice}元</strong>
      <Button onClick={() => props.onPlaceOrder()}>下单</Button>
    </div>
  )
}

// export default () => {
//   return (
//     <Suspense fallback={<div>loading...</div>}>
//       <FoodCart />
//     </Suspense>
//   )
// }

export default class FoodCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      foodMenu:[],
      deskInfo: {}
    }
  }

  cartChange = (food, amount) => {
    var params = this.props.match.params
    this.socket.emit('new food', {desk: 'desk:' + params.did, food, amount})
  }

  foodChange = (food, amount) => {
    var updated = produce(this.state.cart, cart => {
      var idx = cart.findIndex(it => it.food.id === food.id)
      if(idx >= 0) {
        if(amount === 0){
          cart.splice(idx, 1)
        }else {
          cart[idx].amount = amount
        }
      } else {
        cart.push({
          food,
          amount
        })
      }
    })
    this.setState({
      cart: updated
    })
  }

  placeOrder = () => {
    console.log('下单')
    var params = this.props.match.params
    // {
    //   deskName:
    //   customCount:
    //   totalPrice:
    //   foods: [{id, amount}, {}, {}]
    // }
    console.log(params)
    api.post(`/restaurant/${params.rid}/desk/${params.did}/order`, {
      deskName: this.state.deskInfo.name,
      customCount: params.count,
      totalPrice: calcTotalPrice(this.state.cart),
      foods: this.state.cart,
    }).then(res => {
      history.push({
        pathname: `/r/${params.rid}/d/${params.did}/order-success`,
        state: res.data
      })
    })
  }

  componentDidMount() {
    var params = this.props.match.params;
    
    (async () => {
        await api.post('/restaurant/' + params.rid + '/food/test', {did: params.did, msg:'test'}).then(res => {
          if(res.data['msg'] === '桌面错误'){
            alert('桌面错误，即将返回登录页面')
            history.push({
              pathname: `/login`,
            })
          }
        })
        await api.get('/menu/restaurant/' + params.rid).then(res => {
          console.log(res)
          this.setState({
            foodMenu: res.data
          })
        })
      }
      ) ()
      
    api.get('/deskinfo?did=' + params.did).then(val => {
      this.setState({
        deskInfo: val.data
      })
      console.log('deskinfo', this.state.deskInfo)
    })

    // api.get('/menu/restaurant/' + params.rid).then(res => {
    //   console.log(res)
    //   this.setState({
    //     foodMenu: res.data
    //   })
    // })

    // this.socket = io({
    this.socket = io('https://www.tdarita.com:5443',{
      secure: true, 
      reconnect: true, 
      rejectUnauthorized : false,
      path: '/desk',
      query: {
        desk: 'desk:' + params.did
      },
    })

    this.socket.on('connect', () => {
      console.log('connect socket')
      this.socket.emit('join desk', 'desk:' + params.did)
    })

    this.socket.on('cart food', info => {
      console.log('cart food',info)
      this.setState(produce(state => {
        state.cart.push(...info)
      }))
      console.log('socket cart', this.state.cart)
    })

    this.socket.on('new food', info => {
      this.foodChange(info.food, info.amount)
    })

    this.socket.on('placeorder success', order => {
      history.push({
        pathname: `/r/${params.rid}/d/${params.did}/order-success`,
        state: order
      })
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    
    return (
      <div style={{marginBottom: '45px'}}>
        <div>
          餐厅：{this.state.deskInfo.title}<br/>
          餐桌：{this.state.deskInfo.name}
        </div>
        <h2>您好，欢迎来到{this.state.deskInfo.title}用餐，请在下方点餐，祝您用餐愉快!</h2>
        <div>
          {
            this.state.foodMenu.map(food => {
              var currentAmount = 0
              var currFoodItem = this.state.cart.find(it => it.food.id === food.id)
              if(currFoodItem) {
                currentAmount = currFoodItem.amount
              }
              return <MenuItem key={food.id} food={food} amount={currentAmount} onUpdate={this.cartChange}/>
            })
          }
        </div>
        <div>
          <CartStatus cart={this.state.cart} onUpdate={this.cartChange} onPlaceOrder={this.placeOrder}/>
        </div>
      </div>
    )
  }

}

/*
function FoodCart1(props) {
  var params = useParams()

  var [deskInfo, setDeskInfo] = useState(null)

  var foods = menuFetcher.read().data
  var [cart, setCart] = useState([])

  useEffect(() => {
    api.get('/deskinfo?did=' + params.did).then(val => {
      setDeskInfo(val.data)
    })
  }, [])
  

  function foodChange(food, amount) {
    var updated = produce(cart, cart => {
      var idx = cart.findIndex(it => it.food.id === food.id)
      if(idx >= 0) {
        if(amount === 0){
          cart.splice(idx, 1)
        }else {
          cart[idx].amount = amount
        }
      } else {
        cart.push({
          food,
          amount
        })
      }
    })
    setCart(updated)
  }

  function placeOrder() {
    console.log('下单')
    // {
    //   deskName:
    //   customCount:
    //   totalPrice:
    //   foods: [{id, amount}, {}, {}]
    // }
    console.log(params)
    api.post(`/restaurant/${params.rid}/desk/${params.did}/order`, {
      deskName: deskInfo.name,
      customCount: params.count,
      totalPrice: calcTotalPrice(cart),
      foods: cart,
    }).then(res => {
      history.push({
        pathname: `/r/${params.rid}/d/${params.did}/order-success`,
        state: res.data
      })
    })
  }

  return (
    <div>
      <div>
        {
          foods.map(food => {
            return <MenuItem key={food.id} food={food} onUpdate={foodChange}/>
          })
        }
      </div>
      <div>
        <CartStatus cart={cart} onUpdate={foodChange} onPlaceOrder={placeOrder}/>
      </div>
    </div>
  )
}
*/