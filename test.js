var approx_match = require('./index.js')
var assert = require('assert')

assert.equal(5,approx_match.metric('San Diego State','SD ST.'))
assert.equal(11,approx_match.metric('San Diego State','SD STATE.'))
assert.equal(8,approx_match.metric("N'WSTRN",'NORTHWESTERN UNIVERSITY'))

approx_match(['San Diego State', 'Northwestern University'])
assert.equal(approx_match.match("N'wstrn"),'Northwestern University')
