var User = require("../../models/user");
const mongoose = require("../../../sql/mongoose")
var express = require('express');
var router = express.Router();
var con = require("../../../sql/sqlpool");
var Tweet = require("../../models/tweet");

router.post('/deleteprofile', function (req, res) {
    console.log("Inside delete profile request");
    console.log(req.body);

    let query =
        'Delete from user WHERE email = "' +
        req.body.email +
        '";'

    console.log(query)

    con.query(query, (error, results, fields) => {
        if (error) {
            console.log('Error occured while inserting data in DB')
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Error occured while inserting data in DB')
        } else {
            console.log('deleted user!')
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Deleted User')
        }
    })

    User.deleteOne({
        email: req.body.email
    }).then(results => {

        console.log('Successfully fetched data from DB')
        console.log(results);
    })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
        })

        User.update(
            {},
            { $pull: { following: req.body.id , followedBy : req.body.id} },
            { multi: true })
            .then((response)=> {
            console.log(response)
            console.log("Deleted Likes from Tweet")
        })

    Tweet.deleteMany({
        owner: req.body.id
    }).then(results => {

        console.log('Successfully fetched data from DB')
        console.log(results);
    })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
        })

    console.log("Likes Deletion")
    Tweet.update(
        {},
        { $pull: { likes: req.body.id , bookmarks : req.body.id, retweet:req.body.id ,reply :{userid:req.body.id} }},
        { multi: true })
        .then((response)=> {
        console.log(response)
        console.log("Deleted Likes from Tweet")
    })
})


module.exports = router