var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');

router.post('/signup', (req, res) => {
  console.log("Inside signup Post Request");
  console.log("Req Body : ", req.body);
  let type_userowner = 0;
  if (req.body.type === 'user') {
    type_userowner = 1
  } else {
    type_userowner = 2
  }
  kafka.make_request('post_signup', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err || results === "user alredy exists" || results === "Error in kafka-backend") {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Dublicate Entry");
    } else {
      console.log("result received")
      req.session.name = { email: req.body.email, type: type_userowner };
      res.status(200).json({ success: type_userowner, token: 'JWT ' + results.token });
      res.end("Successful Login");
    }

  });

});

module.exports = router