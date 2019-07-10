var tdarita = function() {

  function compact(ary) {
    return ary.filter(it => it)
  }

  function concat(array,...args) {
    for (let i = 0; i < args.length; i++) {
      if(typeof(args[i]) == 'object' && args[i][0]){
        for (let j = 0; j < args[i].length; j++) {
          array.push(args[i][j])
        }
      }else{
        array.push(args[i])
      }
    }
    return array
  }

  function max(array) {
    if(array.length == 0){
      return undefined
    }
    return array.reduce((a,b) => Math.max(a,b))
  }

  function flatten(array) {
    var newArray = []
     var i = -1
     while(++i < array.length){
        if (array[i].length > 0) {
          array[i].forEach(it => newArray.push(it))
        }else{
          newArray.push(array[i])
        }
     }
     return newArray
  }

  function difference(array,...args) {
    var result = []
    var mapE = {}
    var i = -1
    while(++i < args.length){
      var j = -1
      while(++j < args[i].length){
        if(!mapE[args[i][j]]){
          mapE[args[i][j]] = 1
        }else{
          mapE[args[i][j]]++
        }
      }
    }
    array.forEach(it => mapE[it] ? true : result.push(it))
    return result
  }

  function chunk(array, size) {
    var newArray = []
    var i = 0
    var j = 0
    while ((j+1) * size < array.length){
      if (array.length - i < size){
        newArray[j].push(array[i])
      }
    }
  }







  return{
    compact,
    concat,
    max,
    flatten,
    difference,
  }
}()