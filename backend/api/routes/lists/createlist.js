var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');

  router.post("/createlists", function (req, res) {
//     console.log("Inside createlists");
//     var email = req.body.email
//     var members = JSON.parse(req.body.members)
//     var members_id = []    
//     console.log(req.body)

//     members.forEach(member => {

//         User.findOne({username:member}).then((user) => {
//             console.log(user._id)
//             members_id.push(user._id) 
            
//         })
//     });    

//     User.findOne({ email: email }).then((doc) => {           

//         const list = new List({
//             name: req.body.name,
//             description : req.body.description,
//             owner : doc._id,
//             members : members_id  
            
//           });

//           console.log("List created")

//           list.save()
//               .then(result => {
//                   console.log(result);
//                   res.writeHead(200, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("Success");
//               }).catch(error => {
//                   console.log(error)
//               })      

//     }).catch((err) => {
//         console.log("get Createlists Error! " + err)
//         res.writeHead(400, {
//             "Content-Type": "text/plain"
//         });
//         //console.log(JSON.stringify(resultObject))
//         res.end("get createlists fail");
//     })

kafka.make_request('createlist', req.body , function (err, results) {
    console.log('in result');

    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Error");
    } else {
      console.log(results);
      console.log("result received")
      //res.status(200).json({ success: req.body.email });
      res.status(200).end("Successful List Created");
    }
  });

});
module.exports = router