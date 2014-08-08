var Crawler = require('crawler').Crawler;
var catUrl = process.argv[2];
var toPage = process.argv[3] || 1;
var regex = RegExp("http://www.amazon.com/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})");

var c = new Crawler({
  "maxConnections": 10,
  "callback": function(err, result, $) {
    $(".newaps a").each(function(index, a) {
      getAsin(a.href);
    });
    $("#pagnNextLink").each(function(index, a) {
      c.queue(a.href);
    });
  }
});

c.queue(catUrl);

var getAsin = function(url) {
  m = url.match(regex);
  if (m) { 
      console.log(m[4]);
  }
}
