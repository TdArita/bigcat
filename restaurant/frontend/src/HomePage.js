import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'antd'
import 'antd/dist/antd.css';

var homeCardStyle = {
  marginTop: '100px',
  float: 'left',
  width:'200px',
  height: '200px',
  marginLeft: '50%',
  transform: 'translateX(-50%)'
}

export default function(){
  return <Card style={homeCardStyle}>
    <div style={{width: '100px', margin: 'auto', padding: '39px 0px'}}>
      <Button type="primary" style={{width: '100px', marginBottom:'10px'}}>
        <Link to="/login">登录页面</Link>
      </Button>
      <br/>
      <Button type="primary" style={{width: '100px'}}>
        <Link to="/register">注册页面</Link>
      </Button>
    </div>
  </Card>
}