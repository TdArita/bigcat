import React, { Suspense } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import OrderManage from './OrderManage'
import FoodManage from './FoodManage'
import DeskManage from './DeskManage'
import AddFood from './AddFood'
import AddDesk from './AddDesk'
import api from './api'
import history from './history'
import createFetcher from './create-fetcher'
import { PageHeader, Breadcrumb, Icon, Button } from 'antd'

const userInfoFetcher = createFetcher(async () => {
  return api.get('/userinfo').catch(() => {
    history.push('/')
  })
})


// function RestaurantInfo() {
//   var history = useHistory()
//   var [info, setInfo] = useState(null)
//   useEffect(() => {
//   (async () => {
//     try {
//       let response = await api.get('/userinfo')
//       setInfo(response.data)
//     } catch(e) {
//       history.push('/')
//     }
//   })()},[history])
//   // var info = userInfoFetcher.read()
//   console.log(info)
//     return (
//       <div>
//         {
//           info &&
//           '欢迎：' + info.title
//         }
//       </div>
//     )
// }
function RestaurantInfo(props) {
  var info = userInfoFetcher.read()
  return (
    <PageHeader
    style={{
      border: '1px solid rgb(235, 237, 240)',
    }}
    title="欢迎"
    subTitle={info.data.title}
  />
  )
  // return (
  //   <div>
  //     {
  //       info &&
  //       '欢迎：' + info.data.title
  //     }
  //   </div>
  // )
}

export default withRouter(function(props) {
  async function logout() {
    await api.get('/logout')
    userInfoFetcher.clearCache()
    props.history.push('/')
  }
  console.log(props)

  if(document.cookie === ''){
    history.push('/')
  }

  var logoutStyle = {
    position: 'fixed',
    right: '5px',
    top: '5px',
    zIndex: '10'
  }

  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <RestaurantInfo history={history}/>
      </Suspense>

      <Breadcrumb>
        <Breadcrumb.Item href={`#/restaurant/${props.match.params.rid}/manage`}>
          <Icon type="home" />
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`#/restaurant/${props.match.params.rid}/manage/order`}>
          <Icon type="shopping-cart" />
          <span>订单管理</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`#/restaurant/${props.match.params.rid}/manage/food`}>
          <Icon type="coffee" />
          <span>菜品管理</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item href={`#/restaurant/${props.match.params.rid}/manage/desk`}>
          <Icon type="solution" />
          <span>桌面管理</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Button type="danger" style={logoutStyle} onClick={logout}>退出</Button>
      {/* <nav>
        <ul>
          <li>
            <Link to={`/restaurant/${props.match.params.rid}/manage/order`}>订单管理</Link>
          </li>
          <li>
            <Link to={`/restaurant/${props.match.params.rid}/manage/food`}>菜品管理</Link>
          </li>
          <li>
            <Link to={`/restaurant/${props.match.params.rid}/manage/desk`}>桌面管理</Link>
          </li>
          <li>
            <button onClick={logout}>退出</button>
          </li>
        </ul>
      </nav> */}
      <main>
        <Switch>
          <Route path="/restaurant/:rid/manage/order" component={OrderManage}></Route>
          <Route path="/restaurant/:rid/manage/food" component={FoodManage}></Route>
          <Route path="/restaurant/:rid/manage/desk" component={DeskManage}></Route>
          <Route path="/restaurant/:rid/manage/add-food" component={AddFood}></Route>
          <Route path="/restaurant/:rid/manage/add-desk" component={AddDesk}></Route>
        </Switch>
      </main>
    </div>
  )
})