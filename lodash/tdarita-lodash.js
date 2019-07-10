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

  


  return{
    compact,
    concat,
    max,
    flatten,
  }
}()