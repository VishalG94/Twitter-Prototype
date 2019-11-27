const User = require('../../api/models/user')
// const Messages = require('../api/models/message')
const messageSchema = require('../../api/models/message')

let mogooseConn = require('../../sql/mongoose')
var dateforamt = require('dateformat')
const mongoose = require('mongoose')

// console.log(Messages)
function handle_request(msg, callback) {
  var now = new Date()
  var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
  var id = mongoose.Types.ObjectId()
  console.log('Req Body : ', msg)
  let mesg = new messageSchema({
    _id: id,
    sender_name: msg.sender_name,
    receiver_name: msg.receiver_name,
    text: msg.text,
    created: today
  })
  console.log(msg)
  mesg
    .save()
    .then(response => {
      console.log('response' + response)
      callback(null, response)
    })
    .catch(err => {
      console.log('Error occured while inserting data in DB' + err)
      callback(err, 'Error')
    })
}

exports.handle_request = handle_request
