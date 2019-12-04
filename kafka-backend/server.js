var express = require('express')
var app = express()

var connection = new require('./kafka/Connection')
var passport = require('passport')
var mongoose = require('./sql/mongoose')

// topics files
var signup = require('./services/signup')
var login = require('./services/login')
var writetweet = require('./services/writetweet')
var postmessage = require('./services/messages/postmessage')
let messagedetails = require('./services/messages/messagedetails')
var postsearchbar = require('./services/search/searchbar')
// var fetchtweets = require('./services/tweet/fetchtweets');
// var viewtweet = require('./services/tweet/viewtweet');
var profile = require('./services/profile')
var follow = require('./services/followupdate')
var profileupdate = require('./services/profileupdate');
var followedBy = require('./services/followedBy');
var fetchlist = require('./services/lists/fetchlist');
var fetchlistdetails = require('./services/lists/fetchlistdetails');
var fetchuserlists = require('./services/lists/fetchuserlists');
var subscribelist = require('./services/lists/subscribelist');
var unsubscribelist = require('./services/lists/unsubscribelist');
var createlist = require('./services/lists/createlist');
var fetchsubscribedlist = require('./services/lists/fetchsubscribedlist');
var fetchusersubscribedlist = require('./services/lists/fetchusersubscribedlist');

var fetchlisttweets = require('./services/lists/fetchlisttweets');
var messagessearchbar = require('./services/messages/messagessearchbar')
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
handleTopicRequest("profile_update", profileupdate)
handleTopicRequest("followedBy", followedBy)
handleTopicRequest('post_messagessearchbar', messagessearchbar)
// handleTopicRequest('fetchtweets', fetchtweets)
// handleTopicRequest('viewtweet', viewtweet)
handleTopicRequest('fetchlist', fetchlist)
handleTopicRequest('createlist', createlist)
handleTopicRequest('fetchlisttweets', fetchlisttweets)
handleTopicRequest('fetchsubscribedlist', fetchsubscribedlist)
handleTopicRequest('fetchusersubscribedlist', fetchusersubscribedlist)
handleTopicRequest('fetchuserlists', fetchuserlists)
handleTopicRequest('subscribelist', subscribelist)
handleTopicRequest('unsubscribelist', unsubscribelist)
handleTopicRequest('fetchlistdetails', fetchlistdetails)


