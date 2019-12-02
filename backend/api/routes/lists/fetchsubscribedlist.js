var User = require("../../models/user");
var List = require("../../models/list");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();

router.get("/fetchsubscribedlist", function (req, res) {
    console.log("Inside Fetch Subscribed Lists");
    var email = req.query.email
    console.log(email)

    User.findOne({ email: email }).then((doc) => {        

        List.find({  subscribers : { $in : doc._id  }  }  )
            .populate('owner')
            .populate('members')
            // .populate('first_name')
            .exec()
            .then((result1) => {
                console.log(result1)
                res.writeHead(200, {
                    "Content-Type": "text/plain"
                });
                res.end(JSON.stringify(result1));

            }).catch((err) => {
                console.log("Inside tweet find error " + err)
                console.log(err)
            })

    }).catch((err) => {
        console.log("get fetchtweets Error! " + err)
        res.writeHead(400, {
            "Content-Type": "text/plain"
        });
        //console.log(JSON.stringify(resultObject))
        res.end("get fetchlists fail");
    })
});

module.exports = router