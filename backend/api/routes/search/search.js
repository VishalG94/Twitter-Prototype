var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');


router.post('/searchbar', (req, res) => {
  console.log("Inside Search Bar Post Request");
  console.log("Req Body : ", req.body);
  
  kafka.make_request('post_searchbar', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err || results === "error") {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Kuch jol search kiya tune bhai!!");
    } else {
        res.status(200).json(results);
        res.end("done!");
    }
  });

});

module.exports = router