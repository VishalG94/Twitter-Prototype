const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')
// mongoose.set('useCreateIndex', true)

var listSchema = mongoose.Schema({
  
  name : { type: String },
  description : { type: String },
  owner_id: { type: ObjectId, ref:"User" },
  members:  [{type:ObjectId,ref:"User"}],

})

module.exports = mongoose.model('List', listSchema)

// module.exports = messageSchema
