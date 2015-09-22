var metric = function(a, b) {
  var adjust = function(str) {
    return str.replace(/\W/g,' ').replace(/\s/g,'').trim().split('')
  }
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
var metric 
var _corpus = []
var fn = function(corpus) {
  _corpus = _corpus.concat(corpus)
}
fn.metric = metric
fn.match = function(text) {
  var results = []
  for (var i = 0; i < _corpus.length; i++) {
    var c = _corpus[i]
    var m = metric(c,text)
    results.push({metric:m, corpus:c})
  }
  var sr = results.sort(function(a,b) {
    return b.metric - a.metric
  })
  if (sr.length) 
    return sr[0].corpus
  else
    return null
}
fn.add = function(corpustext) {
  _corpus = _corpus.concat(corpustext)
}
module.exports = exports = fn
