const bcrypt = require('bcrypt');
var passport = require('passport');
var con = require("../sql/sqlpool");

require('../config/passport')(passport);

function handle_request(msg, callback) {
    console.log("in signup kafka");
    console.log(msg);
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(msg.password, salt, function (err, hash) {
            let sql = 'INSERT INTO user SET ?'
            let post = {
                firstname: msg.firstname,
                password: hash,
                email: msg.email,
                lastname: msg.lastname,
                username: msg.username
            }
            con.query(sql, post, (err, result) => {
                if (err) {
                    console.log(err);
                    callback(null, "Error in kafka-backend");
                };
                console.log(result)
                callback(null, "valid signup");
                //dostuff(true, post.type);
            });
        });
    });
    // let type_userowner = 0;
    // if (msg.type === 'user') {
    //     type_userowner = 1
    // } else {
    //     type_userowner = 2
    // }
    // Urcs.findOne({ email: msg.email })
    // .exec()
    // .then(ans => {
    //     if(ans){
    //         callback(null,"user alredy exists")
    //     }else{
    //         bcrypt.genSalt(10, function (err, salt) {
    //             bcrypt.hash(msg.password, salt, function (err, hash) {
    //                 const urcs = new Urcs({
    //                     _id: new mongoose.Types.ObjectId(),
    //                     name: msg.username,
    //                     password: hash,
    //                     email: msg.email,
    //                     resname: msg.resname,
    //                     reszip: msg.reszip,
    //                     type: type_userowner
    //                 });
    //                 urcs
    //                     .save()
    //                     .then(result => {
    //                         console.log(result);
    //                         var token = jwt.sign({ email: msg.email }, config.secret, {
    //                             expiresIn: 10080 // in seconds
    //                         });
    //                         callback(null, { success: true, token: 'JWT ' + token });
    //                     })
    //                     .catch(err => {
    //                         console.log(err);
    //                         callback(null, "Error in kafka-backend");
    //                     })
    //             });
    //         });
    //     }
    // })

}

exports.handle_request = handle_request;


// console.log("Inside signup Post Request");
// console.log("Req Body : ", req.body);
// let type_userowner = 0;
// //console.log(res.body.type)
// if (req.body.type === 'user') {
//   type_userowner = 1
// } else {
//   type_userowner = 2
// }
// bcrypt.genSalt(10, function (err, salt) {
//   bcrypt.hash(req.body.password, salt, function (err, hash) {
//     let sql = 'INSERT INTO user SET ?'
//     let post = {
//       name: req.body.username,
//       password: hash,
//       email: req.body.email,
//       resname: req.body.resname,
//       reszip: req.body.reszip,
//       type: type_userowner
//     }
//     con.query(sql, post, (err, result) => {
//       if (err) { dostuff(false); console.log(err); return };
//       dostuff(true, post.type);
//     });
//   });
// });
// let dostuff = (auth, type) => {
//   if (auth) {
//     res.cookie('cookie', { email: req.body.email, type: type }, { maxAge: 900000, httpOnly: false, path: '/' });
//     req.session.user = req.body.email;
//     res.writeHead(200, {
//       'Content-Type': 'text/plain'
//     })
//     res.end("Successful Login");
//   } else {
//     res.writeHead(401, {
//       'Content-Type': 'text/plain'
//     })
//     res.end("Invalid (check username/password length(16) and email is unique");
//   }
// }