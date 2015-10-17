approximate-match
=================

Provides approximate string matching. Works intuitively well, compared to say Levenshtein edit distance.

Specially works with human typing abbreviations.

Methods
=======

.metric(string1,string2)
------------------------

Want a metric between N'WSTRN and NORTHWESTERN UNIVERSITY?

    var approx = require('approximate-match')
    approx.metric("N'wstrn", "Northerwestern University")
    // 8


.add(string)
------------

    var approx = require('approximate-match')
  
    // filling the corpus
    approx(['Northwestern University','San Diego State'])
    // also fill the corpus via .add
    approx.add('Northwestern University')



.add(string,value)
------------------

approx.add('University of Notre Dame',{foo:'bar})



.add(object)
------------

You can add either a string or an object. If you add an object its fields will be searched over
    
    approx.add({key1:'foo', key2:'bar',key3:'baz})
    approx.match('foo')
    // {key1:'foo', key2:'bar',key3:'baz}



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
