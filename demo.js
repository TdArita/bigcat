
function arrayToList(ary) {
  var i = 0
  var List = {}
  if (ary[i])
  List[0] = i
  List[1] = List[0]
  return
}


function listToArray1(list) {
  var array = []
  while(list != null){
    array.push(list.value)
    list = list.next
  }
  return array
}

function listToArray2(list) {
  if (list==null) {
    return []
  }
  var tail = list.next
  return [list.value, ...listToArray2(tail)]
}

function size(list) {
  var c = 0
  while (list != null){

  }
}

function insert(list, index, value) {
  var idx = 0
  while (list) {
    
  }
}

function nth(list, index) {
  var i = 0
  if (i == index){
    return list.value
  }
  i++
  return nth(list.next, i)
}


function random() {
  var twoNum = '' + rand(0.2) + rand(0.2)
  if(twoNum == '10'){
    return 1
  }
  if(twoNum == '01'){
    return 0
  }
}
function rand(p){
  if (Math.random < p) {
    return 1
  }else{
    return false
  }
}
function sumri() {
  var sum = {1:0,0:0}
  for (let i = 0; i < 100; i++) {
    var j = random()
    sum[j]++
  }
}
// 1 和 0 的概率还是50%

// 冒泡排序
function bubbleSort(ary) {
  for (let i = 0; i < ary.length - 1; i++) {
    for (let j = 0; j < ary.length - 1 - i; j++) {
      var left = 0
      var right = 1
      var temp = 0
      if (ary[left] > ary [right]) {
        temp = 
      }
    }
  }
}

// 老师冒泡
function swap(ary, i, j) {
  if (i != j) {
    var t = ary[i]
    ary[i] = ary[j]
    ary[j] = t
  }
}
function bubbleSort(ary) {
  for(var j = ary.length - 2; j >= 0; j--) {
    var swapped = false
    for(var i = 0; i <= j; i++) {
      if (ary[i] > ary[i + 1]) {
        swap(ary, i, i + 1)
        swapped = true
      }
    }
    if (!swapped) {
      break
    }
  }
  return ary
}
// 

// 归并排序 Merge Sort
function mergeSort(ary) {
  var i = 0
  var newAry = []
  while (x) {
    if ary[i] >
  }
}

function mergeSort(ary) {
  if (ary.length < 2) {
    return ary.slice()
  }
  var mid = ary.length >> 1
  var left = ary.slice(0, mid)
  var right = ary.slice(mid)

  mergeSort(left)
  mergeSort(right)

  var i = 0
  var j = 0
  var k = 0

  while(i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      ary[k++] = left[i++]
    } else {
      ary[k++] = right[j++]
    }
  }
  while (i < left.length) {
    ary[k++] = left[i++]
  }
  while (j < right.length) {
    ary[k++] = right[j++]
  }
  return ary
}

function filter(ary, test) {
  var newAry = []
  for (let i = 0; i < ary.length; i++) {
    if(test(ary[i])){
      newAry.push(ary[i])
    }
  }
}
function map(ary, mapper) {
  var newMap = []
  for (let i = 0; i < ary.length; i++) {
    newMap.push(ary[i].mapper)
  }
  return newMap
}

function nineteenCenAve(ary) {
  var sum = 0
  var average = 0
  for (let i = 0; i < ary.length; i++) {
    sum  = sum + ary[i].age
  }
  average = sum / (ary.length + 1)
}

function d(f){
}

function aveAge(ary) {
  var sum = 0
  var nums = 0
  var average = 0
  for (let i = 0; i < ary.length; i++) {
    if(ary[i].sex == 'f' && ary[i].born > 1800){
      sum = sum + ary[i].died - ary[i].born
      nums++
    }
  }
  average = sum / nums
  return average
}
function d(f) {
  return function (x) {
    return f(x+litte) - f(x) / little
  }
}

reduce(ary, 0, (a,b) => a + b)

function reduce(array, combine, start) {
  var current = start
  for (let i = 0; i < array.length; i++) {
    current = combine(current, array[i])
  }
  return current
}
function reduce(ary, reducer, initialVal) {
  initialVal = ary[0]
  for(var i = 1; i < ary.length; i++){
    initialVal =  reducer(initial, ary[i])
  } 
  return initialVal
}

memo => item[i] > memo ? memo = item[i] : memo

reduce(function max() {
  return memo > item ? memo = item : memo  
})

var squared = [1,2,3,4,5].reduce(function (result, item) {
  result.push(item * item)
  return result
},[])

function keyBy(ary, key) {
  var result = {}
  ary.forEach()
  result[ary[key]] = ary
}
var result = {}
ary.reduce(function (result,it) {
  result[it[key]] = it
  return result
}, result)


function ary2tree(ary, rootPos) {
  if(ary[rootPos] >= ary.length){
    return null
  }
  var root = {
    val = ary[rootPos],
    left = ary2tree(ary, rootPos * 2 + 1),
    right = ary2tree(ary, rootPos * 2 + 2)
  }
  
}
function tree2ary(root, pos = 0, result = [] ) {
  if (root){
    return null
  }
  tree2ary()
  return ary
}

function lcary2tree(ary) {

}

function lctree2ary(root) {
  var result = []
  while (root) {
    while(root.left){
      result.push(root.left.val)
      root = root.left
    }
    result.push(null)
    if(root.right){
      result.push(root.right.val)
    }
  }
}-

function BST(root, array) {
  root.left = 

}

function selectSort(ary) {
  var sorted = 0
  var move = 0
  var min = Infinity
  for (let j = 0; j < array.length - 2; j++) {
    for (let i = 0; i < ary.length; i++) {
      if(ary[i]< min)  {
        min = ary[i]
      }
    }
    temp = ary[i]
    ary[i] = ary[move]
    ary[sorted] = temp
  }
}

var d = 0
function transform(str) {
  if (str.length == 1) {
    return str
  }
  transform(str[])

}

function quickSort(ary) {
  var l = ary.length
  var midPoint = Math.floor(Math.random(l*10))
  var left = ary.slice(0,midPoint)
  var right = ary.slice(midPoint)
  quickSort(left) 
  quickSort(right)
  var k = 0
  while (left.val > right.val) {
    if (left.val > right.val) {
      ary[k++] = right.val
    }else{
      ary[k++] = left.val
    }
  }
  return ary
}

function partition(ary, start = 0, end = ary.length - 1){
  var pivotIndex = Math.floor(Math.random(ary.length * 10))
  var left = []
  var middle = []
  var right = []
  swap(ary[random], ary[end])
  var i = -1
  var j = 0

}

function bind(f, arg1, arg2, arg3) {
  return function () {
    for (let i = 0; i < arguments.length; i++) {
      f().apply(null,arguments[i])
      
    }
    f(arg1)
  }
}

function negate(f) {
  return function (...args) {
    return !f(...args)
  }
}

function property(propername) {
  return function (proper){
    return proper[propername]
  }
}
/** */

ary.slice1 = function (start, end = this.length) {
  var result = []
  for (let i = start; i < end; i++) {
    result.push(this[i])
  }
  return result
}

function flip(func) {
  return function(){
    return func(arguments.reverse())
  }
}

function forOwn(obj, iterator) {
  resule = []
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      iterator(obj[key], key, obj)
      } 
    }
}
function Vector(x,y) {
  this.x = x
  this.y = y
}
Vector.prototype.plus = function (v) {
  return new Vector(this.x + v.x, this.y + v.y)
}
Vector.prototype.minus = function (v) {
  return new Vector(this.x - v.x, this.y y v.y)
}
Object.defineProperty(Vector.prototype,)

function Complex(real, image) {
  this.real = real
  this.image = image
}

Complex.prototype = {
  plus:function (c) {
    var real = this.real + c.real
    var image = this.image + c.image
    return new Complex(real, image)
  },
  minus:function (c) {
    var real = this.real - c.real
    var image = this.image - c.image
    return new Complex(real, image)
  },
  mul:function (c) {
    var real = this.real * c.real - this.image * c.imege
    var image = this.real * c.image + this.image * c.real
    return new Complex(real, image)
  },
  division: function (c) {
    var factor = c.real * c.real + c.image * c.image
    var real = 
  },
  toString: function (c) {

  }

}

function Stack() {
  this.top = null
}

Stack.prototype = {
  pop:function () {
    
  }

}

// 队列
function Queue(val) {
  this.head = null
  this.tail = null
}

Queue.prototype = {
  add:function(val){
    this.next = new Queue(val)
    return root
  },
  remove: function (val) {
    var head = root
    var point = root
    while(root){
      if(root.next.val == val){
        root.next = root.next.next
        root
      }
    }
    root
  }
}


class MyMap {
  constructor(initialValues) {
    this.keys = []
    this.values = []
    if (initialValues) {
      for (let i = 0; i < initialValues.length; i++) {
        this.keys.push(initialValues[i][0])
        this.values.push(initialValues[i][1])
      }
    }
  }

  _indexOf(key){
    if(key !== key){
      for (let i = 0; i < this.keys.length; i++) {
        if (this.keys[i] !== this.keys[i]) {
          return i
        }
      }
    }else{
      return this.keys.indexOf(key)
    }
  }
  set(key, val) {
    if (this.has(key)){
      this.values[this._indexOf(key)] = val
    }else{
      this.keys.push(key)
      this.values.push(val)
    }
    return this
  }

  get(key) {
    var idx = this._indexOf(key)
    if (idx >= 0) {
    return this.values[idx]
    }
  }

  delete(key) {
    var idx = this._indexOf(key)
    if(idx >= 0){
      this.keys.splice(idx,1)
      this.values.splice(idx,1)
    }
    return this
  }

  has(key) {
    return this._indexOf(key) >= 0
  }

  clear() {
    this.values.length = 0
    this.keys.length = 0
    return this
  }

  get size() {
    return this.keys.length
  }
}

class MySet {
  constructor(initialValues) {
    this.values = []
    for(let vals of initialValues){
      this.add(vals)
    }
  }

  add(val) { 
    if (!(this.has(val) >= 0)) {
      this.values.push(val)
    }
    return this
  }

  delete(val) {
    if (this.values.indexOf(val) >= 0) {
      this.values.splice(this.values.indexOf(val), 1)
    }
    return this
  }

  has(val) {
    return this.values.includes(val) >= 0
  }

  clear() {
    this.values.length = 0
    return this
  }

  get size() {
    return this.values.length
  }
}

// 堆排序
class PriorityQueue{
  constructor(){

  }

// 删除并返回堆中最大元素
  pop(){

  }

  // 返回堆顶元素
  peak(){

  }

  // 
  push(val){

  }
}

function mergeSort(ary) {
  if (ary.length < 2) {
    return ary.splice()
  }
  var middle = ary.length >> 1
  var left = ary.splice(0, middle)
  var right = ary.splice(middle)
  mergeSort(left)
  mergeSort(right)

  var result = []
  var i = 0
  var j = 0

  while(i < left.length || j < right.length){
    if(left[i++] < right[j]){
      result.push(left[i])
    }
    if(left[i] > right[j++]){
      result.push(right[j])
    }
  }
  while (i < left.length) {
    result.push(left[i++])
  }
  while (j < right.length) {
    result.push(left[j++])
  }
  return result
}

class PriorityQueue{
  constructor(initialValues = []){
    this.elements = initialValues.splice()
    this.heapify()
  }

  heapify(){
    var startIdx = (this.elements.length - 2) >> 1
    for (let i = startIdx; i >= 0; i--) {
      this.heapDowm(i)
    }
  }

// 从某个位置开始向上
  heapUp(idx){
    while (idx > 0) {
      var pIdx = (idx - 1) >> 1
      if (this.elements[idx] > this.elements[pIdx]) {
        this.swap(idx,pIdx)
        idx = pIdx
      }else{
        break
      }
    }
  }

  heapDowm (idx){
    if(idx < this.elements.length){
      var maxIdx = idx
      var cIdxL = idx * 2 + 1
      var cIdxR = cIdxL + 1

      if (cIdxL < this.elements.length && this.elements[cIdxL] > this.elements[maxIdx]) {
        maxIdx = cIdxL
      }
      if (cIdxR < this.elements.length && this.elements[cIdxR] > this.elements[maxIdx]) {
        maxIdx = cIdxR
      }
      if (idx !== maxIdx) {
        this.swap(idx, maxIdx)
        this.heapDowm(maxIdx)
      }else{
        break
      }
    }
  }

  pop(){
    var result = this.elements[0]
    var last = this.elements.pop()
    if (this.elements.length == 0) {
      return result
    }
    this.elements[0] = last
    var cIdx = 0
    while (cIdx < this.elements.length) {
      var cIdxL = cIdx * 2 + 1
      var cIdxR = cIdxL + 1
      var maxIdx = cIdx

      if (cIdxL < this.elements.length && this.elements[cIdxL] > this.elements[maxIdx]) {
        maxIdx = cIdxL
      }
      if (cIdxR < this.elements.length && this.elements[cIdxR] > this.elements[maxIdx]) {
        maxIdx = cIdxR
      }
      if (cIdx !== maxIdx) {
        this.swap(cIdx, maxIdx)
        cIdx = maxIdx
      }else{
        break
      }
  }
    return result
  }
  
  swap(i,j){
    var t = this.elements[i]
    this.elements[i] = this.elements[j]
    this.elements[j] = t
  }

  _push(val){
    this.elements.push(val)
    var valIdx = this.elements.length - 1
    while (valIdx > 0) {
      var pidx = (valIdx - 1) >> 1
      if(this.elements[pidx] < val){
        this.swap(valIdx, pidx)
        valIdx = pidx
      }else{
        break
      }
    }
    return this.elements
  }
}


function heapDowm (ary, idx, end = ary.length){
  if(idx < end){
    var maxIdx = idx
    var cIdxL = idx * 2 + 1
    var cIdxR = cIdxL + 1

    if (cIdxL < end && ary[cIdxL] > ary[maxIdx]) {
      maxIdx = cIdxL
    }
    if (cIdxR < ary.length && ary[cIdxR] > ary[maxIdx]) {
      maxIdx = cIdxR
    }
    if (idx !== maxIdx) {
      swap(ary, idx, maxIdx)
      heapDowm(ary, maxIdx, end)
    }
  }
}

function swap(ary, i, j) {
  var t = ary[i]
  ary[i] = ary[j]
  ary[j] = t
}

function heapSort(ary) {
  heapify(ary)
  for (let i = ary.length - 1; i > 0; i--) {
    swap(ary, i, 0)
    heapDowm(ary, 0, i)
  }
  return ary
}


class Heap extends Array{
  constructor(initialValues = [], compare = (a,b) => a-b){
    super()
    this.compare = compare
  }

  swap(i, j){
    var t = this[i]
    this[i] = this[j]
    this[j] = t
  }
  heapUp(currIdx){
    if(currIdx >= 0){
      var pIdx = (currIdx - 1) >> 1
      if(this[currIdx] < this[pIdx]){
        this.swap(currIdx, pIdx)
        currIdx = pIdx
        this.heapUp(currIdx)
      }
    }
  }
  heapDown(currIdx){
    if(currIdx < this.length){
      var minIdx = currIdx
      var lIdx = currIdx * 2 + 1
      var rIdx = lIdx + 1
      if(lIdx < this.length && this.compare(this[lIdx], this[minIdx]) < 0 ) {
        minIdx = lIdx
      }
      if(rIdx < this.length && this.compare(this[rIdx], this[minIdx]) < 0 ) {
        minIdx = rIdx
      }
      if(currIdx !== minIdx){
        this.swap(currIdx, minIdx)
        this.heapDown(currIdx)
      }
    }
  }
  push(val){
    super.push(val)
    this.heapUp(this.length - 1)
  }
  pop(){
    var result = this[0]
    var last = super.pop()
    if(this.length > 0){
      this[0] = last
      this.heapDown(0)
    }
    return result
  }
}
function RegTest(str) {
  for (let j = 0; j < this.length; j++) {
    var i = 0
    if(this[j] == str[0]){
      while (i < str.length) {
        if(this[j] !== str[i]){
          return false
        }
        j++
        i++
      }
      return true
    }
  }
}

function RegMatch(re,str) {
  var result = []
  var reg = re
  while(match = reg.exec(str)){
    result.push(match[0])
  }
  return result
}

function RegSplit(re,str) {
  var reg = re
  var result = []
  while(matched = reg.exec(str)){
    match = '.'.repeat(reg.lastIndex) + reg
    result.push(matched)
  }
  
  
}

function compose(funcs) {
  return function(...args){
    value = funcs[0](...args)
    for(let i = 0; i< funcs.length; i++){
      value = func[i](value)
    }
  }
}

function spreadGenerator(generator){
  var result = []
  var generated = generator.next
  yield result.push(generator(fibb(20)))
  return result
}

function forof(generator, action){
  var nums = generator.next()
}

var weekday = function (){
  var days = ["mon", "tues", "wes", "thus", "fri", "sat", "sun"]
  return {
    day: function(number){return days[number]},
    number: function(day){return days.indexOf(day)}
  }
}()

function require(name){
  var code = new Function('export', readFile(name))
  var exports = {}
  code(exports)
  return exports
}

var range5 = {
  from:1,
  to:5
}

range5[Symbol.iterator] = function(){
  return{
    begin: this.from,
    end: this.to,
    next(){
      if(this.begin <= this.end){
        return{
          done: false,
          value: this.begin++
        }
      }
      else{
        return{
          done:true
        }
      }
    }
  }
}

function getText(node){
  return '' + node.textValue + getText(node.nextNodes)
}

function cloneNode(node, deep = false){
  if(node){
    if(node.nodeType == document.TEXT_NODE){

    }
  }
}

Array.prototype.slice2 = function(start = 0, end = this.length){
  var result = []
  for(var i = start; i < end; i++){
    result.push(this[i])
  }
  return result
}

function elt(type, ...children){
  var 
}

function dlt2(tagName, attrs){
  var node = document.createElement(tagName)
  var children = attrs.children
  for(var attr in attrs){
    if(attr )
  }
}


Number.prototype.digits = function(){
  this.gen()
  function* gen(){
    for(i = this.length - 1; i >=0; i--){
      yield this[i]
    }
  }
}


for(var digit of 3219..digits()){
  console.log(digit)
}

Number.prototype.digits = function *(){
  var num = this
  while(num > 0){
    var digit = num % 10
    yield digit
    num = num / 10 | 0
  }
}


window.addEventListener('scroll', e => {
  if(add.y <= 0){

  }
})

window.addEventListener('mousemove', e => {

  setTimeout(console.log(), 300)
})

function getFileContent(file){
  var result = ''

}

function delegate(div, 'click', 'p a img', function(e){
  var els = 


})



function asyncMap(ary, asyncMapper, callback){
  for(var i = 0; i< ary.length; i++){

    asyncMapper(ary[i], )
  }
}


function asyncFilter(ary, filterFunc, done){
  var result = []
  var count = 0
  for (let i = 0; i < ary.length; i++) {
    filterFunc(ary[i], (isRetain) => {
      if(isRetain){
        result[i] = ary[i]
      }
      count++
      if(count = ary.length){
        var realResult = []
        for(var idx in result){
          realResult.push(result[idx])
        }
        done(realResult)
      }
    })
  }
}


Promise.resolve = function(val){
  return new Promise(resolve =>{
    resolve(val)
  })
}

Promise.prototype.catch = function(onRejected){
  return this.then(null, onRejected)
}

Promise.all = function(promises) {
  return new Promises((resolve, reject) => {
    var result = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(val => {
        results[i] = val
      })

    }
  })
}


Promise.race = function(values) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < values.length; i++) {
      Promise.resolve(values[i]).then(resolve, reject)
    }
  })
}

p = new Promise(resolve => {
  resolve('done')
})
p.then(alert)
alert('asd')

ReadableStream.prototype.pipe = function(writable){
  var rs = this
}






function forAwait(asyncInterrable, body){
  var generated = asyncInterable.next()

}

forAwait(asyncInterable, val => {

})

Array.prototype.asyncForEach = async function(f){
  var queue = f
  
}

function observe(obj){
  for(item in obj){
    class obj{
      get item(){
        return obj.item
      }
      set item(num){
        this.obj.item = num
      }
    }
  }
}