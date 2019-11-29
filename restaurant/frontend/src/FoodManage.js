import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from './api'
import { Button, Card, Form, Input, Icon, Upload } from 'antd'


var imgStyle = {
  float: 'left',
  border: '1px solid',
  width: '100px',
  height: '100px',
  objectFit: 'cover'
}

var foodInfoStyle = {
  overflow: 'hidden'
}

var cardStyle = {
  padding: '5px',
  margin: '5px'
}

function FoodItem({food, onDelete}) {
  var [isModify, setIsModify] = useState(false)
  var [foodInfo, setFoodInfo] = useState(food)
  function onFoodChange(e){
    setFoodInfo({
      ...foodInfo,
      [e.target.name]: e.target.value
    })
    console.log(foodInfo)
  }
  // function imgChange(e) {
  //   console.log(e.fileList)
  //   setFoodInfo({
  //     ...foodInfo,
  //     img: e.target.files[0]
  //   })
  // }
  function save(){
    setIsModify(false)
    var fd = new FormData()
    for(var key in foodInfo){
      var val = foodInfo[key]
      fd.append(key, val)
    }
    api.put('/restaurant/1/food/' + food.id, fd).then(foodRes => setFoodInfo(foodRes.data)).catch(e => {console.log('修改发生错误')})
  }
  function deleteFood(){
    api.delete('/restaurant/1/food/' + food.id).then(() => {onDelete(food.id)})
  }
  function toggleStatus(){
    foodInfo.status === 'on' ? foodInfo.status = 'off' : foodInfo.status = 'on'
    api.put('/restaurant/1/food/' + food.id, foodInfo).then(foodRes => setFoodInfo(foodRes.data)).catch(e => {console.log('修改发生错误')})
  }

  const props = {
    beforeUpload: file => {
    setFoodInfo({
      ...foodInfo,
      img: file
    })
      return false;
    },
  };

  if(foodInfo){
    return (
      <Card style={cardStyle}>
         <h3>{foodInfo.name}</h3>
         <div style={foodInfoStyle}>
           <img src={'/upload/' + foodInfo.img} alt={foodInfo.name} style={imgStyle}/>
           {/* <img src={'http://10.62.39.224:5000/upload/' + foodInfo.img} alt={foodInfo.name} style={imgStyle}/> */}
           <p>介绍：{foodInfo.desc}</p>
           <p>价格：{foodInfo.price}元</p>
           <p>上架状态：{foodInfo.status === 'on' ? '已上架' : '已下架'}</p>
           <p>分类：{foodInfo.category ? foodInfo.category : '[暂未分类]'}</p>
         </div>
         {
           isModify ?
           <div>
             <Form>
               名称：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.name} name="name"/><br/>
               介绍：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.desc} name="desc"/><br/>
               价格：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.price} name="price"/><br/>
               分类：<Input type="text" onChange={onFoodChange} defaultValue={foodInfo.category} name="category"/><br/>
               <Form.Item label="Upload" extra="图片上传">
                <Upload  {...props}>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
               </Form.Item>
               {/* 图片：<Input type="file" onChange={imgChange} name="img"/><br/> */}
             </Form>
           </div> : ''
         }
         <div>
           <Button onClick={() => setIsModify(true)}>修改</Button>
           <Button onClick={save}>保存</Button>
           <Button onClick={toggleStatus}>{foodInfo.status === 'off' ? '上架' : '下架'}</Button>
           <Button onClick={deleteFood}>删除</Button>
         </div>
      </Card>
    )
  } else {
    return 
  }
}



export default function(props){
  var [foods, setFoods] = useState([])
  useEffect(() => {
    api.get(`/restaurant/${props.match.params.rid}/food`).then(res => setFoods(res.data))
  }, [props.match.params.rid])
  function onDelete(id){
    setFoods(foods.filter(food => food.id !== id))
  }
  console.log(foods)
  return (
    <div>
      <div style={{marginTop:'10px'}}>
        <Button>
          <Link to="add-food">添加菜品</Link>
        </Button>
      </div>
      <div>
        {
          foods.map(food => {
            return <FoodItem onDelete={onDelete} key={food.id} food={food}/>
          })
        }
      </div>
    </div>
  )
}