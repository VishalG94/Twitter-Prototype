const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')


const userSchema = mongoose.Schema({
  
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  image: String,
  description: String,
  username: String,
  email: { type: String, required: true, unique: true, dropDups: true },
  phone: Number,
  password: { type: String, required: true },
  created: { type: Date, default: today },
  modified: { type: Date, default: today },
  bookmarks: [{ type : ObjectId, ref: "Tweet" }],
  following : [{type:ObjectId,ref:"User"}],
  followedBy : [{type:ObjectId,ref:"User"}],
  profileviews : {type:Array}
  
})

module.exports = mongoose.model('User', userSchema);