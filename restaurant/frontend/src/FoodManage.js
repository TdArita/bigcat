import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from './api'


var imgStyle = {
  float: 'left',
  border: '1px solid red',
  width: '100px',
  height: '100px',
  objectFit: 'cover'
}

var foodInfoStyle = {
  overflow: 'hidden'
}

var cardStyle = {
  border: '2px solid',
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
  function imgChange(e) {
    setFoodInfo({
      ...foodInfo,
      img: e.target.files[0]
    })
  }
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
  if(foodInfo){
    return (
      <div style={cardStyle}>
         <h3>{foodInfo.name}</h3>
         <div style={foodInfoStyle}>
           <img src={'http://localhost:5000/upload/' + foodInfo.img} alt={foodInfo.name} style={imgStyle}/>
           <p>介绍：{foodInfo.desc}</p>
           <p>价格：{foodInfo.price}元</p>
           <p>分类：{foodInfo.category ? foodInfo.category : '[暂未分类]'}</p>
         </div>
         {
           isModify ?
           <div>
             <form>
               名称：<input type="text" onChange={onFoodChange} defaultValue={foodInfo.name} name="name"/><br/>
               介绍：<input type="text" onChange={onFoodChange} defaultValue={foodInfo.desc} name="desc"/><br/>
               价格：<input type="text" onChange={onFoodChange} defaultValue={foodInfo.price} name="price"/><br/>
               分类：<input type="text" onChange={onFoodChange} defaultValue={foodInfo.category} name="category"/><br/>
               图片：<input type="file" onChange={imgChange} name="img"/><br/>
             </form>
           </div> : ''
         }
         <div>
           <button onClick={() => setIsModify(true)}>修改</button>
           <button onClick={save}>保存</button>
           <button onClick={toggleStatus}>{foodInfo.status === 'off' ? '上架' : '下架'}</button>
           <button onClick={deleteFood}>删除</button>
         </div>
      </div>
    )
  } else {
    return 
  }
}



export default function(){
  var [foods, setFoods] = useState([])
  useEffect(() => {
    api.get('/restaurant/1/food').then(res => setFoods(res.data))
  }, [])
  function onDelete(id){
    setFoods(foods.filter(food => food.id !== id))
  }
  console.log(foods)
  return (
    <div>
      <Link to="/manage/add-food">添加菜品</Link>
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