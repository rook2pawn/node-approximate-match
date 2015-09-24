approximate-match
=================

Provides approximate string matching. Works intuitively well, compared to say Levenshtein edit distance.

Specially works with human typing abbreviations.


Need a Metric?
==============

Want a metric between N'WSTRN and NORTHWESTERN UNIVERSITY?

    var approx = require('approximate-match')
    approx.metric("N'wstrn", "Northerwestern University")
    // 8

Fill a Corpus, then match
=========================

    var approx = require('approximate-match')
  
    // filling the corpus
    approx(['Northwestern University','San Diego State'])
    // also fill the corpus via add
    approx.add('University of Notre Dame')

    // matching it
    approx.match("N'wstrn")
    // Northewestern University


Object can be added as part of the corpus
=========================================

You can add either a string or an object. If you add an object its fields will be searched over
    
    approx.add({key1:'foo', key2:'bar',key3:'baz})
    approx.match('foo')
    // {key1:'foo', key2:'bar',key3:'baz}
