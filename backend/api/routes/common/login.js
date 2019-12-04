var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');
const bcrypt = require('bcrypt');
//var Urcs = require("../api/models/twitter");
var config = require('../../config/setting');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var con = require("../../../sql/sqlpool");
var User = require("../../models/user");

require('../../config/passport')(passport);


router.post('/login', (req, res) => {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);


  let sql = 'SELECT * from user where email="' + req.body.email + '"';
  console.log(sql);
  con.query(sql, (err, result) => {
    if (err || !result.length) {
      // callback(null, "Invalid Login")
      console.log(err);
    }
    else {
      if (bcrypt.compareSync(req.body.password, result[0].password)) {
        console.log(result[0])
        //dostuff(true, result[0].type);
        var token = jwt.sign({ email: result[0].email }, config.secret, {
          expiresIn: 10080 // in seconds
        });

        User.findOne({ email: result[0].email })
          .then(result1 => {

            console.log("mongo fetch result " + result1)
            var obj = {
              username: result1.username,
              token: 'JWT ' + token,
              email: req.body.email,
              id: result1._id,
              first_name: result1.first_name,
              last_name: result1.last_name,
              
            }

            // res.status(200).json({ username: result.username, token: 'JWT ' + token, email: req.body.email });
            res.status(200).json(obj);
            res.end("Successful Login");
          })

      } else {
        console.log("Unsuccessful Login")
        res.writeHead(400, {
          'Content-Type': 'text/plain'
        })
        res.end("Invalid Credential!");
      }
    }
  });

  // kafka.make_request('post_login', req.body, function (err, results) {
  //   console.log('in result');
  //   console.log(results);
  //   if (err || results === "Invalid Login") {
  //     res.writeHead(404, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Invalid Credential!");
  //   } else {
  //     console.log("result received")
  //     req.session.name = { email: req.body.email };
  //     res.status(200).json({ username : results.username, token: 'JWT ' + results.token , email: req.body.email });
  //     res.end("Successful Login");
  //   }
  // });
});

module.exports = router