var express = require('express');
var router = express.Router();
var path = require('path');
var kafka = require('../../../kafka/client');
const Tweet = require('../../models/tweet');
const User = require('../../models/user');
var upload = require('../../config/multers3');
var imagepath = "";
const aws = require('aws-sdk');
const s3 = new aws.S3(); // Pass in opts to S3 if necessary

//const mongoose = require('../../../sql/mongoose')
// var imagepath = "";
// var multer = require('multer');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     data = JSON.parse(req.body.body);
//     imagepath = data.email + '-' + Date.now() + '.jpg';
//     cb(null, imagepath)
//   }
// })

// const upload = multer({ storage: storage });


//router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


router.post('/writetweet', upload.single('image'), (req, res) => {
  console.log("Inside Write Tweet Request");
  console.log("Req Body : ", (req.body));
  console.log(req.file)
  // var host = req.hostname;
  // if (req.file)
  //   var filepath = req.protocol + "://" + host + ':3001/' + req.file.path;


  const temp = req.body.body;
  // const data = temp;
  const data = JSON.parse(temp);
  console.log(data);
  console.log(data.email);
  // var filepath = '/uploads/' + imagepath;

  User.findOne({ email: data.email })
    .then(result => {
      console.log(result);
      const tweet = new Tweet({
        text: data.text,
        image: req.file.metadata.fieldName,
        owner: result._id
      });

      tweet.save()
        .then(result => {
          console.log(result);

          console.log("result received")
          //res.status(200).json({ success: req.body.email });
          res.status(200).end("Successful Tweet");

        })
        .catch(err => {
          console.log(err);
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          })
          res.end("Error");
        })
    })


// router.post('/writetweet', upload.single('image'), (req, res) => {
//   console.log("Inside Write Tweet")
//   console.log(req.file);
//   //   var filepath = '/uploads/' + imagepath ;

//   console.log('Inside upload post call')
//   console.log(req.file.originalname)
//   console.log(req.file.metadata.fieldName);
//   User
//       .findOneAndUpdate(
//           { email: req.file.originalname },
//           { $set: { image: req.file.metadata.fieldName } }
//       )
//       .then(response => {
//           console.log('response' + response)
//           console.log('Updated image.')
//           res.writeHead(200, {
//               'Content-Type': 'text/plain'
//           })
//           res.end('Successfully Registered')
//       })
//       .catch(err => {
//           console.log('Error occured while upating data in DB')
//           res.writeHead(400, {
//               'Content-Type': 'text/plain'
//           })
//           res.end('Error occured while upating data in DB')
//       })




  // kafka.make_request('post_tweet', { data: req.body, filepath: filepath }, function (err, results) {
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
  //     res.status(200).end("Successful Tweet");
  //   }
  // });

});

module.exports = router