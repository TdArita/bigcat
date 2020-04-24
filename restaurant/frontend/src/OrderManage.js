import React, { Component, useState } from 'react'
import io from 'socket.io-client'
import api from './api'
import { produce } from 'immer'
import { Button, Card, Skeleton } from 'antd'


var orderItemStyle = {
  margin: '5px',
  // padding: '5px'
}
function OrderItem({order, onDelete}) {

  var [orderInfo, setOrderInfo] = useState(order)

  var time = orderInfo.timestamp
  var date = new Date(time).toLocaleString()
  console.log(date)

  // console.log(orderInfo)

  function setConfirm() {
    api.put(`restaurant/1/order/${orderInfo.id}`, {
      status: 'confirmed'
    }).then(() => {
      setOrderInfo({
        ...orderInfo,
        status: 'confirmed'
      })
    })
  }
  
  function setComplete() {
    api.put(`restaurant/1/order/${orderInfo.id}`, {
      status: 'completed'
    }).then(() => {
      setOrderInfo({
        ...orderInfo,
        status: 'completed'
      })
    })
  }
  
  function deleteOrder() {
    api.delete(`restaurant/1/order/${orderInfo.id}`).then(() => {
      onDelete(orderInfo)
    })
  }

  return (
    <Card style={orderItemStyle}>
      {/* <div style={orderItemStyle}> */}
        <h2>餐桌：{orderInfo.deskName}</h2>
        <h3>下单时间：{date}</h3>
        {
          orderInfo.details.map( foodInfo => {
            console.log(foodInfo)
            return(
              <ul key={foodInfo.food.id}>
                <li>菜品：{foodInfo.food.name}</li>
                <li>数量：{foodInfo.amount}</li>
              </ul>
            )
          }
          )
        }
        <h3>总价格：{orderInfo.totalPrice}元</h3>
        <h3>人数：{orderInfo.customCount}</h3>
        <h3>订单状态：{orderInfo.status}</h3>
        <div>
          <Button>打印</Button>
          <Button onClick={setConfirm}>确认</Button>
          <Button onClick={setComplete}>完成</Button>
          <Button onClick={deleteOrder}>删除</Button>
        </div>
      {/* </div> */}
    </Card>
  )
}

export default class OrderManage extends Component{
  constructor(props) {
    super(props)

    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    console.log(this.props)
    // this.socket = io({
    this.socket = io('https://www.tdarita.com:5443', {
      secure: true, 
      reconnect: true, 
      rejectUnauthorized : false,
      path: '/restaurant',
      query: {
        restaurant: 'restaurant:' + this.props.match.params.rid
      }
    })

    this.socket.on('new order', order => {
      this.setState(produce(state => {
        state.orders.unshift(order)
      }))
    })

    api.get('restaurant/1/order').then(res => {
      this.setState(produce(state => {
        state.orders = res.data
      }))
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  onDelete = (order) => {
    var idx = this.state.orders.findIndex(it => it.id === order.id)
    this.setState(produce(state => {
      state.orders.splice(idx, 1)
    }))
  }

  render() {
    return (
      <div>
        <h2>订单管理</h2>
        <div>
          {
            this.state.orders.length > 0 ?
            this.state.orders.map(order => {
              return <OrderItem onDelete={this.onDelete} key={order.id} order={order} />
            }) :
            <div>
              <Skeleton active paragraph={{ rows: 8 }} />
              <Skeleton active paragraph={{ rows: 8 }} />
            </div>
          }
        </div>
      </div>
    )
  } 
}