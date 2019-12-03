var Tweet = require("../../models/tweet");
var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');

router.get("/fetchlisttweets", function (req, res) {
    console.log("Inside fetch List Tweets");
    var email = req.query.email
    var list_id = req.query.list_id    
    console.log(email)
    console.log(list_id)    

    // User.findOne({ email: email  }).then((doc) => {

    //     List.findOne({_id : list_id }).then((doc) => {
    //         console.log("Document of list ");
    //         console.log(doc);
    //         Tweet.find({ owner: { $in: doc.members } })
    //             .populate('owner')
    //             .populate('retweetdata')
    //             .populate({
    //                 path: 'retweetdata',
    //                 populate: {
    //                     path: 'owner'
    //                 }
    //             })
    //             // .populate('first_name')
    //             .exec()
    //             .then((result1) => {
    //                 console.log("Tweet res " + result1)
    //                 res.writeHead(200, {
    //                     "Content-Type": "text/plain"
    //                 });
    //                 res.end(JSON.stringify(result1));
    
    //             }).catch((err) => {
    //                 console.log("Inside tweet find error " + err)
    //                 console.log(err)
    //             })
    
    //     }).catch((err) => {
    //         console.log("get fetchtweets Error! " + err)
    //         res.writeHead(400, {
    //             "Content-Type": "text/plain"
    //         });
    //         //console.log(JSON.stringify(resultObject))
    //         res.end("get fetchtweets fail");
    //     })            
    //     })
    //     // console.log(doc + " Name" + doc.first_name + "fetchtweets success!" + doc.following[0])

    kafka.make_request('fetchlisttweets', {data:req.body,email:email,list_id:list_id} , function (err, results) {
        console.log('Inside Fetch list tweets');
    
        if (err) {
          res.writeHead(404, {
            'Content-Type': 'text/plain'
          })
          res.end("Error inside Fetch list tweets");
        } else {
          console.log(results);
          console.log("result received Fetch List Tweets")
          //res.status(200).json({ success: req.body.email });
          res.status(200).end(JSON.stringify(results));
        }
      });
       
});

module.exports = router