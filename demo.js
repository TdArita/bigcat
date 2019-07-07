
function arrayToList(ary) {
  var i = 0
  var List = {}
  if (ary[i])
  List[0] = i
  List[1] = List[]
  re
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