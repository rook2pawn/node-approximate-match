var assert = require('assert')

var approx = require('./index.js')
var ap = new approx;

assert.equal(4,ap.metric('San Diego State','SD ST.'))
assert.equal(7,ap.metric('San Diego State','SD STATE.'))
assert.equal(6,ap.metric("N'WSTRN",'NORTHWESTERN UNIVERSITY'))

// fill corpus
ap.add('San Diego State');
ap.add('Northwestern University')
var res = ap.match("N'wstrn");
assert.equal(res[0].corpus,'Northwestern University')

ap.add({foo:'bario'})
res = ap.match('bari')
assert.deepEqual(res[0],{metric:4,corpus:{foo:'bario'}})

ap.add({ name: 'Abilene Christian University',
mascot: 'Wildcats',
city: 'Abilene',
state: 'Texas'})

res = ap.match('Abilene Wildcats', ['name','mascot'])
assert.equal(res[0].metric,15)
assert.equal(res[0].corpus.name,'Abilene Christian University')



ap.add({foo:'gabby', bar:'cupid'})
ap.add({foo:'monsoon', bar:'annie'})
res = ap.match('monsoon')
assert.deepEqual(res[0],{ metric: 7, corpus: { foo: 'monsoon', bar: 'annie' } })
res = ap.match('Northwest')
assert.deepEqual(res[0], { metric: 9, corpus: 'Northwestern University' })
