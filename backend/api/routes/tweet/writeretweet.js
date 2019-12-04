var express = require('express');
var router = express.Router();
var path = require('path');
var kafka = require('../../../kafka/client');
const Tweet = require('../../models/tweet');
const User = require('../../models/user');
//const mongoose = require('../../../sql/mongoose')


router.post('/writeretweet', (req, res) => {
    console.log("Inside Write Retweet Request");
    console.log("Req Body : ", (req.body));

    console.log(req.body);
    console.log(req.body.email);

    User.findOne({ email: req.body.email })
        .then(result => {
            console.log(result);
            const tweet = new Tweet({
                text: req.body.text,
                owner: result._id,
                retweetdata: req.body.tweetid,
                retweetFlag: true
            });

            tweet.save()
                .then(result1 => {
                    console.log("Tweet successfull! " + result1);

                    Tweet.findOneAndUpdate({ _id: req.body.tweetid }, { $push: { "retweet": result._id } }, { new: true }).then(result2 => {
                        console.log("Updated origial tweet successfully! " + result2);
                        res.writeHead(200, {
                            "Content-Type": "text/plain"
                        });
                        res.end(JSON.stringify(result2));
                    }).catch(error => {
                        console.log("error occured in update tweet" + error);
                        res.writeHead(400, {
                            "Content-Type": "text/plain"
                        });
                        res.end("Unsuccessful writeretweet");
                    });

                    res.writeHead(200, {
                        "Content-Type": "text/plain"
                    });
                    res.end(JSON.stringify(result1));

                })
                .catch(err => {
                    console.log("Error occured in write tweet" + err);
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Error");
                })
        })

    // kafka.make_request('writeretweet', { req.body: req.body, filepath: filepath }, function (err, results) {
    //   console.log('in result');

    //   if (err) {
    //     res.writeHead(404, {
    //       'Content-Type': 'text/plain'
    //     })
    //     res.end("Error");
    //   } else {
    //     console.log(results);
    //     console.log("result received")
    //     //res.status(200).json({ success: req.body.email });
    //     res.status(200).end("Successful writeretweet");
    //   }
    // });

});

module.exports = router