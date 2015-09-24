var adjust = function(str) {
  return str.replace(/\W/g,' ').replace(/\s/g,'').trim().split('')
}

var metric = function(a, b) {
  if (b.length > a.length) {
    var c = b
    b = a
    a = c 
  }
  var xz = adjust(a)
  var yz = adjust(b)
  var idx = 0;
  var count = 0;
  var dist = undefined
  for (var i = 0; i < yz.length; i++) {
    var ch = yz[i].toLowerCase()
    for (var j = idx; j < xz.length; j++) {
      var ch2 = xz[j].toLowerCase()
      if (ch == ch2) {
        if (dist === 0) 
          count += 2; 
        else
          count++
        dist = 0;
        idx = j + 1
        break;
      } else {
        dist++
      }
    }
  }
  return count
}
var _corpus = []
var fn = function(corpus) {
  _corpus = _corpus.concat(corpus)
}
fn.metric = metric
fn.match = function(text,fields) {
  if (fields === undefined)
    fields = []
  var results = []
  for (var i = 0; i < _corpus.length; i++) {
    var c = _corpus[i]
    switch (typeof c) {
      case 'string' : 
        var m = metric(c,text)
        results.push({metric:m, corpus:c})
        break;
      case 'object' : 
        var keys = Object.keys(c)
        if (fields.length) {
          var str = ''
          fields.forEach(function(key) {
            str = str.concat(c[key]).concat(' ')
          })
          str = str.trim()
          var m = metric(str, text)
          results.push({metric:m, corpus:c})
        } else { 
          for (var j = 0; j < keys.length; j++) {
            var key = keys[j]
            if (typeof text == 'string') {
              var m = metric(c[key],text)
              results.push({metric:m, corpus:c})
            }
          }
        }
        break;
      default: 
        break;
    }
  }
  return results.sort(function(a,b) {
    return b.metric - a.metric
  })
}
fn.add = function(corpustext) {
  _corpus.push(corpustext)
}
module.exports = exports = fn
