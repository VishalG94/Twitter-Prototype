var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');

router.post('/signup', (req, res) => {
  console.log("Inside signup Post Request");
  console.log("Req Body : ", req.body);

  kafka.make_request('post_signup', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err || results === "user alredy exists" || results === "Error in kafka-backend") {
      console.log("Error in backend !")
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Dublicate Entry");
    } else {
      console.log("result received")
      res.status(200).json({ success: req.body.email });
      res.end("Successful Login");
    }

  });

});

module.exports = router