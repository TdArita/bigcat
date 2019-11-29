import React, { Suspense, useState } from 'react'
import { withRouter } from 'react-router-dom'
import createFetcher from './create-fetcher'
import api from './api'
import './LandingPage.css'
import { Card, Button } from 'antd'

var fetcher = createFetcher((did) => {
  return api.get('/deskinfo?did=' + did)
})


function Deskinfo({did}) {
  var info = fetcher.read(did).data
  return (
    <div>
      <span>{info.name}</span>
      <span>{info.title}</span>
    </div>
  )
}

export default withRouter(function(props){
  var [custom, setCustom] = useState(0)

  console.log(props)

  var rid = props.match.params.rid
  var did = props.match.params.did
  function startOrder() {
    props.history.push(`/r/${rid}/d/${did}/c/${custom}`)
  }

  return (
  <Card style={{width: '90%', margin: '10px auto', textAlign:'center'}}>
    <div className="LandingPage">
      <Suspense fallback = {<div>正在加载桌面信息</div>}>
        <Deskinfo did={did} />
      </Suspense>
      <h2>请选择人数</h2>
      <ul className="custom-count" style={{width: '300px', margin: '10px auto'}}>
        <li className={custom === 1 ? 'active' : null} onClick={() => setCustom(1)}>1</li>
        <li className={custom === 2 ? 'active' : null} onClick={() => setCustom(2)}>2</li>
        <li className={custom === 3 ? 'active' : null} onClick={() => setCustom(3)}>3</li>
        <li className={custom === 4 ? 'active' : null} onClick={() => setCustom(4)}>4</li>
      </ul>
      <Button type="primary" onClick={startOrder}>开始点餐</Button>
    </div>
  </Card>
  )
})