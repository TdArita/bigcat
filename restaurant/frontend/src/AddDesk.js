import React, {useState} from 'react'
import api from './api'
import history from './history'
import { Button, Card, Form, Input } from 'antd'

function AddDesk(props) {
  var [deskInfo, setDeskInfo] = useState({
    name: '',
    capacity: 0
  })

  function onDeskChange(e){
    setDeskInfo({
      ...deskInfo,
      [e.target.name]: e.target.value
    })
    console.log(deskInfo)
  }

  function submit(e){
    e.preventDefault()
    api.post('/restaurant/1/desk', deskInfo).then(res => {
      history.goBack()
    })
  }

  return (
    <div>
      <Card style={{width:'800px'}}>
        <h2>添加桌面</h2>
        <Form style={{width:'500px'}}>
          名称：<Input type="text" onChange={onDeskChange} defaultValue={deskInfo.name} name="name"/><br/>
          最大容纳人数：<Input type="text" onChange={onDeskChange} defaultValue={deskInfo.capacity} name="capacity"/><br/>
          <Button onClick={submit} type='primary'>提交</Button>
        </Form>
      </Card>
    </div>
  )
}

export default AddDesk