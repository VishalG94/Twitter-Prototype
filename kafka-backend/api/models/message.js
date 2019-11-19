const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
//mongoose.set('useCreateIndex', true)

var messageSchema = mongoose.model({
  
  sender_name: { type: ObjectId, ref:"User" },
  receiver_name: { type: ObjectId, ref:"User" },
  text: { type: String },
  created: { type: Date, default: today },  
})


module.exports = mongoose.model('Messages', messageSchema);
