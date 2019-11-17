const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  image: String,
  description: String,
  email: { type: String, required: true, unique: true, dropDups: true },
  phone: Number,
  password: { type: String, required: true },
  created: { type: Date, default: today },
  modified: { type: Date, default: today },
  bookmarks: [{ _id, $ref: 'address_home' }]
})

module.exports = mongoose.model('twitter', urcsSchema)
