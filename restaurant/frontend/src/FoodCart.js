import React, { useState, useEffect, Suspense } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import createFetcher from './create-fetcher'
import api from './api'
import { produce } from 'immer'


var imgStyle = {
  float: 'left',
  width: '100px',
  height: '100px',
  border: '2px solid',
}
var menuItemStyle= {
  border: '2px solid',
  padding: '5px',
  margin: '5px',
  overflow:'hidden'
}

function MenuItem({food, onUpdate}) {
  var [count, setCount] = useState(0)

  function dec() {
    if(count === 0) {
      return
    }
    setCount(count - 1)
    onUpdate(food, count - 1)
  }
  function inc() {
    setCount(count + 1)
    onUpdate(food, count + 1)
  }
  return (
    <div style={menuItemStyle}>
      <h3>{food.name}</h3>
      <div>
        <img style={imgStyle} src={"http://localhost:5000/upload/" + food.img} alt={food.name}/>
        <p>{food.desc}</p>
        <p>{food.price}</p>
      </div>
      <div>
        <button onClick={dec}>-</button>
        <span>{count}</span>
        <button onClick={inc}>+</button>
      </div>
    </div>
  )
}

MenuItem.propTypes = {
  food: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
}

MenuItem.defaultProps = {
  onUpdate: () => {},
}

var menuFetcher = createFetcher(() => {
  return api.get('/menu/restaurant/1')
})


function FoodCart(props) {
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
      height:'50px',
      bottom: '5px',
      border: '2px solid',
      left: '5px',
      right: '5px',
      background: 'pink'
    }}>
      <button onClick={toggleExpand}>{expand ? '收起' : '展开'}</button>
      <strong>总价： {totalPrice}</strong>
      <button onClick={() => props.onPlaceOrder()}>下单</button>
    </div>
  )
}

export default () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <FoodCart />
    </Suspense>
  )
}