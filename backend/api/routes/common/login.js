var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');


router.post('/login', (req, res) => {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);
  
  kafka.make_request('post_login', req.body, function (err, results) {
    console.log('in result');
    console.log(results);
    if (err || results === "Invalid Login") {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Invalid Credential!");
    } else {
      console.log("result received")
      req.session.name = { email: req.body.email };
      res.status(200).json({ username : results.username, token: 'JWT ' + results.token , email: req.body.email });
      res.end("Successful Login");
    }
  });
});

module.exports = router