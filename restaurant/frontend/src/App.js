import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import FoodCart from './FoodCart';
import RestaurantManage from './RestaurantManage';
import Login from './Login';
import HomePage from './HomePage';
import OrderSuccess from './OrderSuccess'
import Register from './Register'
import history from './history'

// 用户侧
// 登录
// 扫码进入页面，选择人数 /landing/restaurant/35/desk/20
// 点餐页面/restaurant/35/desk/20
// 点餐成功页面

// 商户侧
// 登录
// 订单管理: /manage/orders
// 订单详情页面: /manage/order/35
// 菜品管理: /manage/food
// 桌面管理: /manage/desk

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/landing/r/:rid/d/:did" component={LandingPage} />
        <Route path="/r/:rid/d/:did/c/:count" component={FoodCart} />
        <Route path="/r/:rid/d/:did/order-success" component={OrderSuccess} />
        <Route path="/restaurant/:rid/manage" component={RestaurantManage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
