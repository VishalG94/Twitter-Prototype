const bcrypt = require('bcrypt')
var passport = require('passport')
var con = require('../sql/sqlpool')
const User = require('../api/models/user')

require('../config/passport')(passport)

function handle_request(msg, callback) {
  console.log('in signup kafka')
  console.log(msg)
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(msg.password, salt, function (err, hash) {
      let sql = 'INSERT INTO user SET ?'
      let post = {
        firstname: msg.firstname,
        password: hash,
        email: msg.email,
        lastname: msg.lastname,
        username: msg.username,
      }
      con.query(sql, post, (err, result) => {
        if (err) {
          console.log(err)
          callback(null, 'Error in kafka-backend')
        } else {
          console.log(result)
          const user = new User({
            first_name: msg.firstname,
            last_name: msg.lastname,
            email: msg.email,
            password: hash,
            username: msg.username,
          })

          user
            .save()
            .then(result => {
              console.log(result)
              callback(null, 'valid signup')
            })
            .catch(err => {
              console.log(err)
              callback(err, null)
            })
        }
      })
    })
  })
}

exports.handle_request = handle_request
