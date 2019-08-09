function isMatch(obj, src) {
  if (obj === src) {
    return true
  }
  for(var key in src) {//   {a:1},  2
    if (typeof src[key] == 'object' && src[key] !== null) {
      if (!isMatch(obj[key], src[key])) {
        return false
      }
    } else {
      if (obj[key] != src[key]) {
        return false
      }
    }
  }
  return true
}

function bind(f, thisArg, ...fixedArgs) {//1, window, window, 3,
  return function(...args) {//4, 5
    var acturalArgs = [...fixedArgs]
    for(var i = 0; i < acturalArgs.length; i++) {
      if (acturalArgs[i] === window) {
        acturalArgs[i] = args.shift()
      }
    }
    acturalArgs.push(...args)
    return f.apply(thisArg, acturalArgs)
  }
}

function matches(src) {
  return function(obj) {
    return isMatch(obj, src)
  }
}
var matches = src => bind(isMatch, null, window, src)


var isMale = matches({gender: 'male'})
isMale({
  name:'zhangshan',
  age: 18,
  gender: 'male',
})

function toPath(str) {//a.b.0.c[fooo][bar].d
  return str.split(/\.|\[|\]./g)
}

function get(obj, path, defaultVal) {//[a,b,c,d]
  var path = toPath(path)
  for(var i = 0; i < path.length; i++) {
    if (obj === undefined) {
      return defaultVal
    }
    obj = obj[path[i]]
  }
  return obj
}

function get(obj, path, defaultVal) {
  if (obj === undefined) {
    return defaultVal
  }
  return get(obj[path[0]], path.slice(1))
}
function get(obj, path, defaultVal) {
  return path.reduce((obj, propName) => {
    return obj[propName]
  }, obj)
}


// matchesProperty('a.b')
function matchesProperty(path, value) {
  return function (obj) {
    return isEqual(get(obj, path), value)
  }
}

function property(path) {
  return function(obj) {
    return get(obj, path)
  }
  return bind(get, null, window, path)
}


function iteratee(value) {

  if (typeof value == 'string') {
    return property(value)
  }
  if (Array.isArray(value)) {
    return matchesProperty(value)
  }
  if (typeof value == 'object') {
    return matches(value)
  }
  return value
}



function map(ary, predicate) {
  predicate = iteratee(predicate)
}

function dropWhile(ary, predicate) {
  predicate = iteratee(predicate)

}

function dropRightWhile(ary, predicate) {
  predicate = iteratee(predicate)
}




function curry(f) {

}

function add(a,b,c,d,e,f) {
  return a + b + c + d + e + f
}

add2 = curry(add)

function curry(f, length = f.length) {
  return function(...args) {
    if (args.length >= length) {
      return f(...args)
    } else {
      return curry(f.bind(null, ...args), length - args.length)
    }
  }
}

add2(1,2,3,4)(5)(6)



function compose(funcs) {
  return function(...args) {
    var value = funcs[0](...args)
    for(var i = 1; i < funcs.length; i++) {
      value = funcs[i](value)
    }
    return value
  }
}