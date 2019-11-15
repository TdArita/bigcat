import React, { Suspense } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import OrderManage from './OrderManage'
import FoodManage from './FoodManage'
import DeskManage from './DeskManage'
import AddFood from './AddFood'
import api from './api'
import history from './history'
import createFetcher from './create-fetcher'



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
    <div>
      {
        info &&
        '欢迎：' + info.data.title
      }
    </div>
  )
}

export default withRouter(function(props) {
  async function logout() {
    await api.get('/logout')
    userInfoFetcher.clearCache()
    props.history.push('/')
  }
  if(document.cookie === ''){
    history.push('/')
  }
  return (
    <div>
      <Suspense fallback={<div>loading...</div>}>
        <RestaurantInfo history={history}/>
      </Suspense>
      <nav>
        <ul>
          <li>
            <Link to="/manage/order">订单管理</Link>
          </li>
          <li>
            <Link to="/manage/food">菜品管理</Link>
          </li>
          <li>
            <Link to="/manage/desk">桌面管理</Link>
          </li>
          <li>
            <button onClick={logout}>退出</button>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route path="/manage/order" component={OrderManage}></Route>
          <Route path="/manage/food" component={FoodManage}></Route>
          <Route path="/manage/desk" component={DeskManage}></Route>
          <Route path="/manage/add-food" component={AddFood}></Route>
        </Switch>
      </main>
    </div>
  )
})