// var Tweet = require("../../models/tweet");
var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
// var redis = require('redis');
// var redisClient = redis.createClient();

// redisClient.on('connect', function () {
//     console.log('Redis client connected');
// });

// redisClient.on('error', function (err) {
//     console.log('Something went wrong while connecting redis' + err);
// });


router.get("/followers", function (req, res) {
    console.log("Inside fetch followers");
    var id = req.query.id

    // const RedisKey = id;

    // redisClient.get(RedisKey, (err, data) => {
    //     if (data != null) {
    //         console.log("From redis")
    //         var te = JSON.parse(data)
    //         // var t = JSON.stringify(te)
    //         return res.json({ te })
    //     } else {

            User.find({ _id: id })
                // .populate('followedBy')
                .then((result1) => {
                    console.log("Tweet res " + result1)
                    // redisClient.setex(RedisKey, 600, result1[0])
                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end(JSON.stringify(result1[0]));

                }).catch((err) => {
                    console.log("Inside tweet find error " + err)
                    console.log(err)
                })
        // }
    // })
})



module.exports = router;
