var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var signup = require('./api/routes/common/signup')
var login = require('./api/routes/common/login')
var messages = require('./api/routes/messages/messages')
var tweet = require('./api/routes/tweet/writetweet')
var fetchtweets = require('./api/routes/tweet/fetchtweets')
var hitlike = require('./api/routes/tweet/hitlike')
var hitbookmark = require('./api/routes/tweet/hitbookmark')
var hitreply = require('./api/routes/tweet/hitreply')
var deletetweet = require('./api/routes/tweet/deletetweet')
var increamentview = require('./api/routes/tweet/increamentview')
var writeretweet = require('./api/routes/tweet/writeretweet')
var viewtweet = require('./api/routes/tweet/viewtweet')
var searchbar = require('./api/routes/search/search')
var profile = require('./api/routes/profile/profile')
var usertweets = require('./api/routes/usertweets/usertweets')
var userlikes = require('./api/routes/usertweets/userlikes')
var fetchlist = require('./api/routes/lists/fetchlist')
var fetchlistdetails = require('./api/routes/lists/fetchlistdetails')
var fetchuserlists = require('./api/routes/lists/fetchuserlists')
var createlist = require('./api/routes/lists/createlist')
var subscribelist = require('./api/routes/lists/subscribelist')
var unsubscribelist = require('./api/routes/lists/unsubscribelist')
var fetchlisttweets = require('./api/routes/lists/fetchlisttweets')
var fetchsubscribedlist = require('./api/routes/lists/fetchsubscribedlist')
var fetchusersubscribedlist = require('./api/routes/lists/fetchusersubscribelists')

var followers = require('./api/routes/followers/followers')
var bookmarkedtweets = require('./api/routes/bookmarkedtweets/bookmarkedtweets')
var profileviews = require('./api/routes/profile/profileviews')
var deleteprofile = require('./api/routes/profile/deleteprofile')
var userretweets = require('./api/routes/usertweets/userretweets')

app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/images', express.static('public'))
app.use(cookieParser())
// saltround = 10;

var cors = require('cors')

app.use(cors({ origin: 'http://18.223.168.146:3000', credentials: true }))

app.use(
  session({
    secret: 'thisissparta',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000 * 2, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
)

app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://18.223.168.146:3000')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.use(signup)
app.use(login)
app.use(messages)
app.use(tweet)
app.use(searchbar)
app.use(profile)
app.use(fetchtweets)
app.use(hitlike)
app.use(hitreply)
app.use(hitbookmark)
app.use(writeretweet)
app.use(usertweets)
app.use(userretweets)
app.use(userlikes)
app.use(viewtweet)
app.use(increamentview)
app.use(deletetweet)
app.use(followers)
app.use(bookmarkedtweets)
app.use(fetchlist)
app.use(fetchuserlists)
app.use(fetchsubscribedlist)
app.use(createlist)
app.use(fetchlisttweets)
app.use(fetchusersubscribedlist);
app.use(subscribelist)
app.use(unsubscribelist)
app.use(fetchlistdetails)

app.use(profileviews)
app.use(deleteprofile)
app.listen(3001)
console.log('Server Listening on port 3001')
