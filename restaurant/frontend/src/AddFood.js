import React, {useState} from 'react'
import api from './api'
import history from './history'
import { Button, Card, Form, Input, Icon, Upload } from 'antd'

function AddFood(props) {
  var [foodInfo, setFoodInfo] = useState({
    name: '',
    desc: '',
    price: 0,
    category: '',
    status: 'on',
    img: null
  })

  function onFoodChange(e){
    setFoodInfo({
      ...foodInfo,
      [e.target.name]: e.target.value
    })
    console.log(foodInfo)
  }

  // function imgChange(e) {
  //   setFoodInfo({
  //     ...foodInfo,
  //     img: e.target.files[0]
  //   })
  // }

  function submit(e){
    e.preventDefault()
    var fd = new FormData()
    for(var key in foodInfo){
      var val = foodInfo[key]
      fd.append(key, val)
    }
    api.post('/restaurant/1/food', fd).then(res => {
      history.goBack()
    })
  }

  const propss = {
    beforeUpload: file => {
    setFoodInfo({
      ...foodInfo,
      img: file
    })
      return false;
    },
  };

  return (
    <div>
      <Card style={{width:'800px'}}>
        <h2>添加菜品</h2>
        <Form style={{width:'500px'}}>
          名称：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.name} name="name"/><br/>
          介绍：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.desc} name="desc"/><br/>
          价格：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.price} name="price"/><br/>
          分类：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.category} name="category"/><br/>
          <Form.Item label="Upload" extra="图片上传">
            <Upload  {...propss}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </Form.Item>
          {/* 图片：<Input type="file" onChange={imgChange} name="img"/><br/> */}
          <Button onClick={submit} type='primary'>提交</Button>
        </Form>
      </Card>
    </div>
  )
}

export default AddFood