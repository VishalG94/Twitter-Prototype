// var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();


router.get("/followers", function (req, res) {
    console.log("Inside fetch followers");
    var email = req.query.email
    console.log(followedBy)

    User.find({ _id: { $in: followedBy } })
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

})



module.exports = router;
