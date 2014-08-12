var Crawler = require('crawler').Crawler;

var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");

var getAsin = function(the_url) {
  m = the_url.match(regex);
  if (m) { 
      return m[4];
  }
}

module.exports = function(url, callback){
  var c = new Crawler({
    "maxConnections": 10 || process.argv[3],
    "callback": function(err, result, $) {
      if (err) { 
        console.err(err);
        callback(err, null);
      }
      else {
        $(".newaps a").each(function(index, a) {
          var asin = getAsin(a.href);
          if (asin != undefined) {
            callback(null, asin);
          }
        });
        $("#pagnNextLink").each(function(index, a) {
          c.queue(a.href);
        });
      }
    }
  });
  c.queue(url);
}
