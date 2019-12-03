const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
// mongoose.set('useCreateIndex', true)

var listSchema = mongoose.Schema({
  
  name : { type: String },
  description : { type: String },
  owner: { type: ObjectId, ref:"User" },
  members:  [{type:ObjectId,ref:"User"}],
  subscribers : [{type:ObjectId,ref:"User"}],
  created_date : { type: Date, default: today },

})

module.exports = mongoose.model('List', listSchema)

// module.exports = messageSchema
