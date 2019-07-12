
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