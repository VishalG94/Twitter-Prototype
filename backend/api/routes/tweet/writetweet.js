var express = require('express');
var router = express.Router();
const multer = require('multer');

const storec = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/tweet/')
  },
  filename: function (req, file, cb) {
    info = JSON.parse(req.body.body);
    cb(null, info.text + '.jpg')
  }
});

const uploadc = multer({ storage: storec })

router.post('/writetweet', uploadc.single('image'), (req, res) => {
  console.log("Inside Cuisine Post Request");
  re = JSON.parse(req.body.body);
  console.log(re);
//   re['photo'] = '/sc/cuisine/' + re.name + req.cookies.cookie.email + '.jpg';
//   let post = {
//     name: re.name,
//     description: re.des,
//     foodtype: re.menutype,
//     price: parseInt(re.price, 10),
//     photo: re.photo
//   }
//   Urcs.updateOne({ email: req.cookies.cookie.email }, { $push: { cuisine: post } })
//     .exec()
//     .then(res => {
//       console.log(res);
//       dostuff(true);
//     })
//     .catch(err => {
//       console.log(err);
//       dostuff(false);
//     })
//   let dostuff = (auth) => {
//     if (auth) {
//       res.writeHead(200, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("Successful add cuisine");
//     } else {
//       res.writeHead(401, {
//         'Content-Type': 'text/plain'
//       })
//       res.end("add cuisine, something went wrong");
//     }
//   }
});

module.exports = router