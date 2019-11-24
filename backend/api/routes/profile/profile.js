var express = require('express');
var router = express.Router();
var kafka = require('../../../kafka/client');
const user = require('../../../../kafka-backend/api/models/user')
const User = require('../../../../kafka-backend/api/models/user')
const mongoose = require('mongoose')
var upload = require('../../../multer');


// router.get('/profile',function(req,res){
//     console.log("In Get Profile Query");
//     console.log(req.query.email);
//     let data = req.query;
//     console.log(data.email);
//     user.find({email : data.email}).then((result)=>{
//       console.log("Profile Query");
//       if (result) {
//                   res.writeHead(200, {
//                       'Content-Type': 'text/plain'
//                   })
//                   // console.log(docs);
//                   console.log("Success");
//                   console.log(JSON.stringify(result[0]));
//                   res.end(JSON.stringify(result[0]));

//               } else {
//                   res.writeHead(400, {
//                       'Content-Type': 'text/plain'
//                   })
//                   res.end("Unable to get data");
//                   console.log("Unable get data");
//               }
//   });
//   });

router.get('/profile', function (req, res) {

    console.log("Inside get User profile route" + req.session);
    var email = req.query.email;
    console.log(email);

    kafka.make_request("profile", email, function (err, results) {
        console.log('Result from Kafka Backend\n', results);
        if (err) {
            console.log(" ERROR Occurred");
            res.json({
                status: "error",
                msg: "System Error, Try Again."
            })
        } else {
            console.log("Profile for user " + " sent to client");
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results[0]));
        }
    });

});

router.post('/followupdate', function (req, res) {
    console.log("Inside Profile Update");
    console.log(req.body);
  
    kafka.make_request("follow",req.body,function(err,results){
      if (err){
        console.log( " ERROR Occurred");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
      console.log("\nProfile for user sent to client");
      res.writeHead(200,{
          'Content-Type' : 'application/json'
          })
          res.end(JSON.stringify(results));
      }
    })
  
  })



// router.post('/followupdate', function (req, res) {
//     console.log("Inside Update Post Request\n");
//     let data = req.body;
//     console.log(data.following);
//     user.updateOne({ email: data.following },
//         { $push: { following: id } }).then((result) => {
//             console.log("In Update Profile Query");
//             console.log(result);
//             if (!result) {
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("Unable to get data");
//                 console.log("Unable get data");
//             } else {
//                 res.writeHead(200, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("Successful");
//                 console.log("Successful updated");
//             }

//         });
// })

router.post('/profile', function (req, res) {
    upload(req, res, err => {
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Issue with uploading')
        } else {
            console.log('Inside upload post call')
            console.log(req.file.originalname)
            console.log(req.file.filename);
            User
                .update(
                    { email: req.file.originalname },
                    { $set: { image: req.file.filename } }
                )
                .then(response => {
                    console.log('response' + response)
                    console.log('Updated image.')
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('Successfully Registered')
                })
                .catch(err => {
                    console.log('Error occured while upating data in DB')
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end('Error occured while upating data in DB')
                })
        }
    })
})

router.post('/userimage', function (req, res) {
    console.log('Inside User Image')
    let filename = null
    let binaryData = null
    let base64String = null

    User
        .find({
            email: req.body.email
        })
        .then(results => {
            // let query= res[0].image;
            if (
                results[0].image === null ||
                results[0].image === [] ||
                typeof results[0].image === 'undefined'
            ) {
                console.log('No records found!')
            } else {
                console.log(results[0].image)
                console.log(__dirname.split('/routes')[0] + '/public/profile/' + results[0].image);
                binaryData = fs.readFileSync(
                    __dirname.split('/routes')[0] + '/public/profile/' + results[0].image
                )
                console.log(binaryData);
                base64String = new Buffer(binaryData).toString('base64')
                console.log('Successfully fetched data from DB')
                console.log(JSON.stringify(results[0]));
                res.writeHead(200, {
                    'Content-Type': 'image/png'
                })
                res.end(base64String)
            }
        })
        .catch(err => {
            console.log('Error occured while fetching data from DB.')
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end('Error occured while fetching data from DB')
        })
})

module.exports = router