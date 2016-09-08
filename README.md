[![Build Status](https://travis-ci.org/rook2pawn/node-approximate-match.svg?branch=master)](https://travis-ci.org/rook2pawn/node-approximate-match)

approximate-match
=================

Provides approximate string matching. Works intuitively well, compared to say Levenshtein edit distance.
Specially works with human typing abbreviations.

Main Methods
============

Add to the corpus on initialization

    var ApproxMatch = require('approximate-match')
    var ap = new ApproxMatch(['Northwestern University','San Diego State'])


Or add to the corpus with .add

    var ApproxMatch = require('approximate-match')
    var ap = new ApproxMatch;
    ap.add('Northwestern University')


Corpus association
==================

Individual string items that are searched within the corpus can be associated with an object or atomic, so that
those associations can be retrieved upon matching.


.add(string,value)
------------------

Here we associate {foo:'bar'} with "University of Notre Dame"

    approx.add('University of Notre Dame',{foo:'bar})


Searching over Fields
=====================

.add(object)
------------

If you add an object its fields will be searched over
    
    approx.add({key1:'foo', key2:'bar',key3:'baz})
    approx.match('foo')
    // {key1:'foo', key2:'bar',key3:'baz}

Note that adding an object precludes it from having an associated return object. This may change in the future.



Matching
========

Ease of Use of the .match function. Weather your corpus has a mix of both string items and objects, .match will search across all of them. 

Example:

    ap.add({foo:'gabby', bar:'cupid'})
    ap.add({foo:'monsoon', bar:'annie'})
    res = ap.match('monsoon')
    assert.deepEqual(res[0],{ metric: 7, corpus: { foo: 'monsoon', bar: 'annie' } })
    res = ap.match('Northwest')
    assert.deepEqual(res[0], { metric: 9, corpus: 'Northwestern University' })

.match(string)
--------------

    // matching it
    approx.match("N'wstrn")
    // Northewestern University
    
If there was an associated object it will be returned as well


.match(string,list)
-------------------

You can specify certain fields if the internal matching encounters an object
The text to be matched will be matched against the keys ordered together.

    approx.add({ name: 'Abilene Christian University',
    mascot: 'Wildcats',
    city: 'Abilene',
    state: 'Texas'})

    approx.match('Abilene Wildcats', ['name','mascot'])
    // 'Abilene Wildcats' will be matched against 'Abilene Christian University Wildcats'
    // and return that object


Other Methods
===================

.metric(string1,string2)
------------------------

Want a metric between N'WSTRN and NORTHWESTERN UNIVERSITY?

    var ApproxMatch = require('approximate-match')
    var ap = new ApproxMatch;
    ap.metric("N'wstrn", "Northerwestern University")
    // 8


.setMetric
----------

You can use your own metric or use the convenience metrics available on
the require object

var ApproxMatch = require('approximate-match');
var ap = new ApproxMatch;


// this metric is the forgiving forward metric
ap.setMetric(ApproxMatch.metric)

// or 

// this metric rewards continual letter-by-letter matching
ap.setMetric(ApproxMatch.metric_with_discard)
