var express = require('express')
var app = express()

var connection = new require('./kafka/Connection')
var passport = require('passport')
var mongoose = require('./sql/mongoose')

// topics files
var signup = require('./services/signup.js')
var login = require('./services/login.js')
var writetweet = require('./services/writetweet.js')
var postmessage = require('./services/postmessage.js')
let messagedetails = require('./services/messagedetails')
var postsearchbar = require('./services/search/searchbar')
var profile = require('./services/profile.js')
var follow = require('./services/followupdate.js')
app.use(passport.initialize())

function handleTopicRequest(topic_name, fname) {
  // var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name)
  var producer = connection.getProducer()
  console.log('server is running ' + topic_name)
  consumer.on('message', function (message) {
    console.log('message received for ' + topic_name + ' ', fname)
    console.log(JSON.stringify(message.value))
    var data = JSON.parse(message.value)

    fname.handle_request(data.data, function (err, res) {
      console.log('after handle' + res)
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ]
      producer.send(payloads, function (err, data) {
        console.log(data)
      })
    })
  })
}

// Add your TOPICs here
// first argument is topic name
// second argument is a function that will handle this topic request

handleTopicRequest('post_signup', signup)
handleTopicRequest('post_login', login)
handleTopicRequest('post_tweet', writetweet)
handleTopicRequest('post_message', postmessage)
handleTopicRequest('message_details', messagedetails)
handleTopicRequest('post_searchbar', postsearchbar)
handleTopicRequest('profile', profile)
handleTopicRequest('follow', follow)