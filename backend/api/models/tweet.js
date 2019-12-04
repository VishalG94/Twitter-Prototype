const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

const tweetSchema = mongoose.Schema({
  text: { type: String, required: true },
  image: String,
  owner: { type: ObjectId, ref: 'User' },
  retweet: [{ type: ObjectId }],
  reply: [{ userid: String, username:String, comment: String }],
  likes: [{ type: ObjectId }],
  time: { type: Date, default: Date.now },
  retweetFlag: Boolean,
  bookmarks: [{ type: ObjectId }],
  retweetdata: { type: ObjectId, ref: 'Tweet' },
  views: { type: Array }
})

module.exports = mongoose.model('Tweet', tweetSchema)
