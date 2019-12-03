const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
// mongoose.set('useCreateIndex', true)

var messageSchema = mongoose.Schema({
  // sender_name: { type: ObjectId, ref: 'User' },
  // receiver_name: { type: ObjectId, ref: 'User' },
  sender_name: { type: String },
  receiver_name: { type: String },
  text: { type: String },
  created: { type: Date, default: today }
})

module.exports = mongoose.model('Message', messageSchema)

// module.exports = messageSchema
