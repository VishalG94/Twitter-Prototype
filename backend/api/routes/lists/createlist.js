var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

 router.post("/createlists", function (req, res) {
    console.log("Inside createlists");
    var email = req.body.email
    var members = JSON.parse(req.body.members)
    var members_id = []
    
    console.log(req.body)
    
    
    
    members.forEach(member => {

        User.findOne({username:member}).then((user) => {
            console.log(user._id)
            members_id.push(user._id) 
            
        })
    });


    // for(i=0;i<members.length;i++)
    // {
    //     console.log(members[i])
    //     User.findOne({username:members[i]}).then((user) => {
    //         console.log(user._id)
    //         members_id.push(user._id) 
    //         if(i == (members.length))
    //         {
    //             flag=true
    //         }
    //     })
    // }

    User.findOne({ email: email }).then((doc) => {           

        const list = new List({
            name: req.body.name,
            description : req.body.description,
            owner : doc._id,
            members : members_id  
            
          });

          console.log("List created")

          list.save()
              .then(result => {
                  console.log(result);
                  res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end("Success");
              }).catch(error => {
                  console.log(error)
              })      

    }).catch((err) => {
        console.log("get Createlists Error! " + err)
        res.writeHead(400, {
            "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end("get createlists fail");
    })
});

module.exports = router