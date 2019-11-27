var express = require('express');
var router = express.Router();
var path = require('path');
var kafka = require('../../../kafka/client');
const Tweet = require('../../models/tweet');
const User = require('../../models/user');
//const mongoose = require('../../../sql/mongoose')
var imagepath = "";
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    data = JSON.parse(req.body.body);
    imagepath = data.email + '-' + Date.now() + '.jpg';
    cb(null, imagepath)
  }
})

const upload = multer({ storage: storage });
//router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


router.post('/writetweet', upload.single('image'), (req, res) => {
  console.log("Inside Write Tweet Request");
  console.log("Req Body : ", (req.body));

  // var host = req.hostname;
  // if (req.file)
  //   var filepath = req.protocol + "://" + host + ':3001/' + req.file.path;


  const temp = req.body.body;
  // const data = temp;
  const data = JSON.parse(temp);
  console.log(data);
  console.log(data.email);
  var filepath = '/uploads/' + imagepath;

  User.findOne({ email: data.email })
    .then(result => {
      console.log(result);
      const tweet = new Tweet({
        text: data.text,
        image: filepath,
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