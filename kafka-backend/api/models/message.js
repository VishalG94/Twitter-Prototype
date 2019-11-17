const mongoose = require('mongoose')
const dateforamt = require('dateformat')
var now = new Date()
var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
//mongoose.set('useCreateIndex', true)

var message = mongoose.model('message',{
  _id: mongoose.Schema.Types.ObjectId,
  sender_name: { type: String },
  receiver_name: { type: String },
  text: { type: String },
  created: { type: Date, default: today }
}
)


module.exports = message ;