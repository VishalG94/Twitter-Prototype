var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');

router.get("/fetchusersubscribedlist", function (req, res) {
    console.log("Inside Fetch Subscribed Lists");
    var username = req.query.username
    console.log(username);

    // User.findOne({ email: email }).then((doc) => {        

    //     List.find({  subscribers : { $in : doc._id  }  }  )
    //         .populate('owner')
    //         .populate('members')
    //         // .populate('first_name')
    //         .exec()
    //         .then((result1) => {
    //             console.log(result1)
    //             res.writeHead(200, {
    //                 "Content-Type": "text/plain"
    //             });
    //             res.end(JSON.stringify(result1));

    //         }).catch((err) => {
    //             console.log("Inside tweet find error " + err)
    //             console.log(err)
    //         })

    // }).catch((err) => {
    //     console.log("get fetchtweets Error! " + err)
    //     res.writeHead(400, {
    //         "Content-Type": "text/plain"
    //     });
    //     //console.log(JSON.stringify(resultObject))
    //     res.end("get fetchlists fail");
    // })

    kafka.make_request('fetchusersubscribedlist', {data:req.body,username:username} , function (err, results) {
        console.log('Inside Fetch Subscribed lists');
    
        if (err) {
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          })
          res.end("Error inside Fetch User Subscribed list");
        } else {
          console.log(results);
          console.log("result received Fetch user Subscribed List")
          //res.status(200).json({ success: req.body.email });
          res.status(200).end(JSON.stringify(results));
        }
      });

});

module.exports = router