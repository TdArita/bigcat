import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from './api'
import { Button, Card, Form, Input } from 'antd'


var deskInfoStyle = {
  overflow: 'hidden'
}

var cardStyle = {
  padding: '5px',
  margin: '5px'
}

function DeskItem({desk, onDelete}) {
  var [isModify, setIsModify] = useState(false)
  var [deskInfo, setDeskInfo] = useState(desk)
  function onDeskChange(e){
    setDeskInfo({
      ...deskInfo,
      [e.target.name]: e.target.value
    })
    console.log(deskInfo)
  }

  function save(){
    setIsModify(false)
    api.put('/restaurant/1/desk/' + desk.id, deskInfo).then(deskRes => setDeskInfo(deskRes.data)).catch(e => {console.log('修改发生错误')})
  }
  function deleteDesk(){
    api.delete('/restaurant/1/desk/' + desk.id).then(() => {onDelete(desk.id)})
  }

  if(deskInfo){
    return (
      <Card style={cardStyle}>
         <h3>桌面名称：{deskInfo.name}</h3>
         <h3>桌面ID：{deskInfo.id}</h3>
         <div style={deskInfoStyle}>
           <p>最大容纳人数：{deskInfo.capacity}人</p>
         </div>
         {
           isModify ?
           <div>
             <Form>
               名称：<Input type="text" onChange={onDeskChange} defaultValue={deskInfo.name} name="name"/><br/>
               最大容纳人数：<Input type="text" onChange={onDeskChange} defaultValue={deskInfo.capacity} name="capacity"/><br/>
             </Form>
           </div> : ''
         }
         <div>
           <Button onClick={() => setIsModify(true)}>修改</Button>
           <Button onClick={save}>保存</Button>
           <Button onClick={deleteDesk}>删除</Button>
         </div>
      </Card>
    )
  } else {
    return 
  }
}


export default function(props){
  var [desks, setDesks] = useState([])
  useEffect(() => {
    api.get(`/restaurant/${props.match.params.rid}/desk`).then(res => setDesks(res.data))
  }, [props.match.params.rid])
  function onDelete(id){
    setDesks(desks.filter(desk => desk.id !== id))
  }
  console.log(desks)
  return (
    <div>
      <div style={{marginTop:'10px'}}>
        <Button>
          <Link to="add-desk">添加桌面</Link>
        </Button>
      </div>
      <div>
        {
          desks.map(desk => {
            return <DeskItem onDelete={onDelete} key={desk.id} desk={desk}/>
          })
        }
      </div>
    </div>
  )
}