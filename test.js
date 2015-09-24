var approx = require('./index.js')
var assert = require('assert')

assert.equal(5,approx.metric('San Diego State','SD ST.'))
assert.equal(11,approx.metric('San Diego State','SD STATE.'))
assert.equal(8,approx.metric("N'WSTRN",'NORTHWESTERN UNIVERSITY'))

// fill corpus
approx(['San Diego State', 'Northwestern University'])
assert.equal(approx.match("N'wstrn")[0].corpus,'Northwestern University')

approx.add({foo:'bario'})
assert.deepEqual(approx.match('bari')[0],{metric:7,corpus:{foo:'bario'}})

approx.add({ name: 'Abilene Christian University',
mascot: 'Wildcats',
city: 'Abilene',
state: 'Texas'})

var res = approx.match('Abilene Wildcats', ['name','mascot'])
assert.equal(res[0].metric,28)
assert.equal(res[0].corpus.name,'Abilene Christian University')
