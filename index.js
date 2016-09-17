RegExp.escape = function(text) {
  if (!arguments.callee.sRE) {
    var specials = [
      '/', '.', '*', '+', '?', '|',
      '(', ')', '[', ']', '{', '}', '\\'
    ];
    arguments.callee.sRE = new RegExp(
      '(\\' + specials.join('|\\') + ')', 'g'
    );
  }
  return text.replace(arguments.callee.sRE, '\\$1');
}

var adjust = function(str,nosplit) {
  if (nosplit)
    return str.replace(/\W/g,' ').replace(/\s/g,'').trim().toLowerCase()
  else
    return str.replace(/\W/g,' ').replace(/\s/g,'').trim().toLowerCase().split('')
}

var metric_with_discard = function(a, b) {
  if (b.length > a.length) {
    var c = b
    b = a
    a = c 
  }
  var xz = adjust(a)
  var yz = adjust(b)
  var idx = 0;
  var count = 0;
  for (var i = 0; i < xz.length; i++) {
    var ch = xz[i]
    if (yz[idx] === undefined)
      break;
    var ch2 = yz[idx]
    if (ch == ch2) {
      count++
      idx++
    }
  }
  return count
}
var metric = function(a, b) {
  var xz = adjust(a)
  var yz = adjust(b)
  var idx = 0;
  var count = 0;
  var dist = undefined
  var skips = 0;
  var maxvalued = (2*(yz.length - 1)) + 4;
  for (var i = 0; i < yz.length; i++) {
    var ch = yz[i].toLowerCase()
    for (var j = idx; j < xz.length; j++) {
      var ch2 = xz[j].toLowerCase()
      if (ch == ch2) {
        if (dist === 0) {
          count += 2; 
        } else {
          count++
        }
        if (j === 0) {
          count += 3;
        }
        dist = 0;
        idx = j + 1
        // if we exhaust the max value early we award bonus
        break;
      } else {
        dist++;
        skips++;
      }
    }
  }
  if ((xz.length === yz.length) && (count >= maxvalued)) {
    count += 10
  }
  return count - skips
}
var add = function() {
  var args = [].slice.call(arguments);
  var last = args[args.length -1] 
  if (typeof last == 'object') {
    for (var i = 0; i < args.length - 1; i++) {
      this._corpus.push({corpustext:args[i],value:last});
    }
  } else {
    for (var i = 0; i < args.length; i++) {
      this._corpus.push(args[i])
    }
  }
}
var addObject = function(corpusobject) {
  this._corpus.push(corpusobject);
}
var match = function(text,fields,pref_fields) {
  text = adjust(text,true)
  if (fields === undefined)
    fields = []
  var metric = this.metric;
  var results = []
  for (var i = 0; i < this._corpus.length; i++) {
    var c = this._corpus[i]
    switch (typeof c) {
      case 'string' : 
        var m = metric(c,text)
        results.push({metric:m, corpus:c})
        break;
      case 'object' : 
        if (c.corpustext && c.value) {
          var m = metric(c.corpustext,text)
          var obj = {metric:m, corpus:c.corpustext,value:c.value};
          results.push(obj);
        } else { 
          var keys = Object.keys(c)
          if (fields && fields.length) {
            var immediate_match = false;
            if (pref_fields && pref_fields.length) {
              for (var j = 0; j < pref_fields.length; j++) {
                var key = pref_fields[j]
                if (c[key] === undefined) {
                  continue;
                }
                var z = RegExp.escape(c[key])
                var re = new RegExp('^'+adjust(z,true)+'$',"i")
                if (text.match(re)) {
                  m = 1000;
                  results.push({metric:m, corpus:c})
                  immediate_match = true
                  break;
                }
              }
            } 
            if (!immediate_match) {
              var str = ''
              fields.forEach(function(key) {
                if (c[key] !== undefined) {
                  str = str.concat(c[key]).concat(' ')
                }
              })
              str = str.trim()
              if (str.length !== 0) {
                var m = metric(str, text)
                results.push({metric:m, corpus:c})
              }
            }
          } else { 
            for (var j = 0; j < keys.length; j++) {
              var key = keys[j]
              if (typeof text == 'string') {
                var m = metric(c[key],text)
                results.push({metric:m, corpus:c})
              }
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
var fn = function(corpus) {
  if (!(this instanceof fn))
    return new fn(corpus)
  if (corpus === undefined)
    corpus = []
  this._corpus = corpus
  this.addObject = addObject;
  this.add = add;
  this.match = match;
  this.metric = metric_with_discard
  this.setMetric = function(fn) {
    this.metric = fn;
  }
}
fn.metric = metric;
fn.metric_with_discard = metric_with_discard;

module.exports = exports = fn
