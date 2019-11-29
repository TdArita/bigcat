import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import api from './api'
import { Form, Input, Button, Icon } from 'antd'

export default withRouter(function(props){
  // var nameRef = useRef()
  // var passwordRef = useRef()
  // var captchaRef = useRef()
  var [name, setName] = useState()
  var [password, setPassword] = useState()
  var [confirmPassword, setConfirmPassword] = useState()
  var [title, setTitle] = useState()
  var [email, setEmail] = useState()
  console.log(props)
  
  function handleName(e){
    setName(e.target.value)
  }
  function handlePass(e){
    setPassword(e.target.value)
  }
  function handleConfirmPass(e) {
    setConfirmPassword(e.target.value)
  }
  function handleTitle(e) {
    setTitle(e.target.value)
  }
  function handleEmail(e) {
    setEmail(e.target.value)
  }
  async function login(e) {
    e.preventDefault()
    // var name = nameRef.current.value
    // var password = passwordRef.current.value
    // var captcha = captchaRef.current.value
    if(confirmPassword !== password){
      alert('请确认密码')
      return
    }
    console.log('发送信息', name, password)
    try {
      var res = await api.post('/register', {name, email, password, title})
      console.log('res',res)
      props.history.push(`/login`)
    } catch(e) {
      console.dir(e)
      alert(e.response.data.msg)
    }
  }
  var cardStyle={
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '250px',
    textAlign:'center',
    border: '1px solid #fbfbfb',
    backgroundColor: '#fbfbfb',
    borderRadius: '4px',
    zIndex: '10'
  }
  var backgroundStyle = {
    width: 'calc(100% + 10px)',
    height: 'calc(100% + 10px)',
    backgroundImage: 'url(http://img.1ppt.com/uploads/allimg/1803/1_180319154959_1.JPG)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(4px)',
    margin: '-5px -5px'
  }
  return (
    <div style={{width: '100%',height: '100%', overflow: 'hidden'}}>
      <div style={backgroundStyle}></div>
      <div style={cardStyle}>
        <h2 style={{display: 'inline-block'}}>餐厅管理员注册</h2>
        <Form className="login-form">
          <Input 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="text" onChange={handleName} placeholder="用户名"
          />
          <Input 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="text" onChange={handleTitle} placeholder="餐厅名"
          />
          <Input 
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="text" onChange={handleEmail} placeholder="邮箱"
          />
          <Input 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password" placeholder="密码"  onChange={handlePass}
          />
          <Input 
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password" placeholder="确认密码"  onChange={handleConfirmPass}
          />
          <Button type="primary" style={{marginTop: '5px', width: '250px'}} onClick={login}>注册</Button>
        </Form>
      </div>
    </div>
  )
})