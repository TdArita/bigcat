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

  function flatten(array) {
    return [].concat(...array)
  }


  function flatten2(array) {
    var newArray = []
    for (const item of array) {
      if (Array.isArray(item)) {
        newArray.push(...item)
      }else{
        newArray.push(item)
      }
    }
    return newArray
  }

  function flatten3(array) {
    flattenDepth(array)
  }



  function flattenDeep(array) {
    var newArray = []
    for (const item of array) {
      if (Array.isArray(item)) {
        var flattenItem = flattenDeep(item)
        newArray.push(...flattenItem)
      }else{
        newArray.push(item)
      }
    }
    return newArray
  }
  
  function flattenDepth(array, depth = 1) {
    if (depth == 0) {
      return array.slice()
    }
    var newArray = []
    for (const item of array) {
      if (Array.isArray(item)) {
        var flattenItem = flattenDepth(item, depth - 1)
        newArray.push(...flattenItem)
      }else{
        newArray.push(item)
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
    while(array.length > 0){
      newArray.push(array.slice(0,size))
      array = array.slice(size)
    }
    return newArray
  }

  function flip(func) {
    return function (...args) {
      return func(...args.reverse())
    }
  }

  function before(n, func){
    var lastResult
    var times = 0
    return function(...args){
      times++
      if (times < n) {
        return lastResult = func(...args)
      }else{
        return lastResult
      }
    }
  }

  function after(n, func){
    var times = 0
    return function(...args){
      times++
      if (times < n) {
        return
      }else{
        return func(...args)
      }
    }
  }

  function ary(f, n = f.length) {
    return function (...args) {
      return f(...args.slice(0,n))
    }
  }

  function unary(f) {
    return ary(f,1))
  }

  function spread(f) {
    return function (ary) {
      return f(...ary)
    }
  }

  function memoize(func) {
    var result = {}
    return function(arg){
      if(arg in result){
        return result[arg]
      }else{
        return result[arg] = func(arg)
      }
    }
  }

  function identity(...args) {
    return args[0]
  }

  function bind(f,...args){
    return function(...arg2s){
      return f(...args,...arg2s)
    }
  }

  function negate(f) {
    return function(...args){
      return !f(...args)
    }
  }





  return{
    compact,
    concat,
    max,
    flatten,
    flattenDeep,
    flattenDepth,
    difference,
    chunk,
    flip,
    before,
    after,
    ary,
    unary,
    spread,
    memoize,
    identity,
    bind,

  }
}()