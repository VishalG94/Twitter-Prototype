var express = require('express');
var router = express.Router();
var path = require('path');
var kafka = require('../../../kafka/client');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage });
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));


router.post('/writetweet', upload.single('image'), (req, res) => {
  console.log("Inside Write Tweet Request");
  console.log("Req Body : ", (req.body));

  var host = req.hostname;
  if (req.file)
    var filepath = req.protocol + "://" + host + ':3001/' + req.file.path;
  else {
    var filepath = "";
  }

  kafka.make_request('post_tweet', { data: req.body, filepath: filepath }, function (err, results) {
    console.log('in result');

    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Error");
    } else {
      console.log(results);
      console.log("result received")
      //res.status(200).json({ success: req.body.email });
      res.status(200).end("Successful Tweet");
    }
  });

});

module.exports = router