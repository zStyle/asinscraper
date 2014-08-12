var fs = require('fs');
var catUrl = process.argv[2];
var fileName = process.argv[3];
var asincat = require('./asin-cat-module');

asincat(catUrl, function(err, asin) {
  if (err) console.err(err);
  else {
    console.log(asin);
    fs.appendFile(fileName, asin + '\n', function(err) {
      if (err) console.err(err);
    });
  }
});
