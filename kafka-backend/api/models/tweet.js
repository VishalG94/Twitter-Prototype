const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId
const dateformat = require('dateformat')
var now = new Date()
var today = dateformat(now, 'yyyy-mm-dd HH:MM:ss')

const tweetSchema = mongoose.Schema({
  text: { type: String, required: true },
  image: String,
  owner: { type: ObjectId, ref: 'User' },
  retweet: [{ userid: ObjectId, time: Date, description: String }],
  reply: [{ userid: String, comment: String }],
  likes: [{ type: ObjectId }],
  time: { type: Date, default: Date.now },
  retweetFlag: Boolean,
  retweetdata: { type: ObjectId, ref: 'Tweet' },
  bookmarks: [{ type: ObjectId }]
})

module.exports = mongoose.model('Tweet', tweetSchema)
