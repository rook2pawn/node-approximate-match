approximate-match
=================

Works well with unusual abbreviations

Need a Metric?
==============

Want a metric between N'WSTRN and NORTHWESTERN UNIVERSITY?

  var approx = require('approximate-match')
  approx.metric("N'wstrn", "Northerwestern University")
  // 8

Fill a Corpus, then match
=========================

  var approx = require('approximate-match')
  approx(['Northwestern University','San Diego State'])

  approx.match("N'wstrn")
  // Northewestern University
