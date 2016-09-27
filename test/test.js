var test = require('tape');
var approx = require('../index.js')

test('add string list with object at end', function(t) {
    t.plan(1)
    var obj = {foo:42}
    var ap = new approx;
    ap.add('beep', 'boop','cupid','gabby',obj)
    var x = ap.match('gabb')
    t.equal(x[0].corpus, 'gabby')
})
test('add string list with object at end immediate match', function(t) {
    t.plan(1)
    var obj = {foo:42,bar:['gabster','gab']}
    var ap = new approx;
    ap.add('beep',obj)
    var x = ap.match('gabster',null, 'bar')
    t.equal(x[0].corpus, 'beep')
})
test('metric', function (t) {
    var ap = new approx;
    t.plan(3);
    t.equal(4,ap.metric('San Diego State','SD ST.'))
    t.equal(7,ap.metric('San Diego State','SD STATE.'))
    t.equal(6,ap.metric("N'WSTRN",'NORTHWESTERN UNIVERSITY'))
});

test('match string test', function(t) {
    var ap = new approx;
    t.plan(2);
    // fill corpus
    ap.add('San Diego State');
    ap.add('Northwestern University')
    var res = ap.match("N'wstrn");
    t.equal(res[0].corpus,'Northwestern University')

    ap.addObject({foo:'bario'})
    res = ap.match('bari')
    t.deepEqual(res[0],{metric:4,corpus:{foo:'bario'}})
})

test('match on object', function(t) {
    var ap = new approx;
    t.plan(2);
    ap.addObject({ name: 'Abilene Christian University',
    mascot: 'Wildcats',
    city: 'Abilene',
    state: 'Texas'})

    res = ap.match('Abilene Wildcats', ['name','mascot'])
    t.equal(res[0].metric,15)
    t.equal(res[0].corpus.name,'Abilene Christian University')
})



test('match across different objects and text', function(t) {
    var ap = new approx;
    t.plan(2);
    ap.add('Northwestern University')
    ap.addObject({foo:'gabby', bar:'cupid'})
    ap.addObject({foo:'monsoon', bar:'annie'})
    res = ap.match('monsoon')
    t.deepEqual(res[0],{ metric: 7, corpus: { foo: 'monsoon', bar: 'annie' } })
    res = ap.match('Northwest')
    t.deepEqual(res[0], { metric: 9, corpus: 'Northwestern University' })
})

test('match across multiple items for the same object', function(t) {
    var ap = new approx;
    t.plan(1);
    ap.add('University of Southern California', 'USC', 'So.Cal.',{school:'USC'})
    // use the metric that rewards sequential matching
    ap.setMetric(approx.metric)
    res = ap.match('USC');
    t.deepEqual(res[0], { metric: 18, corpus: 'USC', value: { school: 'USC' } })
})



test('test exact score bonus metric', function (t) {
    var ap = new approx;
    ap.setMetric(approx.metric)
    t.plan(1);
    ap.add('Kansas');
    var res = ap.match('KANSAS')
    t.equal(res[0].metric, 24)
});
