var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();


router.get("/fetchtweets", function (req, res) {
    console.log("Inside fetchtweets");
    var email = req.query.email
    console.log(email)

    User.findOne({ email: email }).then((doc) => {

        console.log(doc + " Name" + doc.first_name + "fetchtweets success!" + doc.following[0])

        Tweet.find({ owner: { $in: doc.following } })
            .populate('owner')
            // .populate('first_name')
            .exec()
            .then((result1) => {
                console.log("Tweet res " + result1)
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
        res.end("get fetchtweets fail");
    })
});

// router.get("/fetchtweets", function (req, res) {
//     console.log("Inside fetchtweets profile");
//     var email = req.query.email
//     console.log(email)


//     Tweet.find({ text: email }).then((result1) => {
//         console.log("Tweet res " + result1)
//         res.writeHead(200, {
//             "Content-Type": "text/plain"
//         });
//         res.end(JSON.stringify(result1));
//     }).catch((err) => {
//         console.log(err)
//         res.writeHead(400, {
//             "Content-Type": "text/plain"
//         });
//         //console.log(JSON.stringify(resultObject))
//         res.end("get fetchtweets fail");
//     })
// })

module.exports = router