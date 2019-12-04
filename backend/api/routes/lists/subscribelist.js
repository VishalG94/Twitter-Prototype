var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');

router.post("/subscribelist", function (req, res) {
    console.log("Inside fetchlists");
    
    kafka.make_request('subscribelist', req.body , function (err, results) {
        console.log('in result');
    
        if (err) {
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          })
          res.end("Error");
        } else {
          console.log(results);
          console.log("result received Subscribe List")
          //res.status(200).json({ success: req.body.email });
          res.status(200).end(JSON.stringify(results));
        }
      });

});

module.exports = router