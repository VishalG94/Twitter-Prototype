const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let cors = require('cors')
const User = require('../../models/user');
app.use(bodyParser.json())
let dateforamt = require('dateformat')
const messages = require('../../../api/models/message')
let mogooseConn = require('../../../sql/mongoose')
const messageSchema = require('../../models/message')
// var dateforamt = require('dateformat')
// const mongoose = require('mongoose')
let kafka = require('../../../kafka/client')

router.post('/postmessage', function (req, res) {
  console.log('Inside messages Post Request')
  // let msg = req.body
  // var now = new Date()
  // var today = dateforamt(now, 'yyyy-mm-dd HH:MM:ss')
  // var id = mongoose.Types.ObjectId()
  // console.log('Req Body : ', msg)
  // let mesg = new messageSchema({
  //   _id: id,
  //   sender_name: msg.sender_name,
  //   receiver_name: msg.receiver_name,
  //   text: msg.text,
  //   created: today
  // })
  // console.log(msg)
  // mesg
  //   .save()
  //   .then(response => {
  //     console.log('response' + response)
  //     // callback(null, response)
  //     res.writeHead(200, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Successfully Registered')
  //   })
  //   .catch(err => {
  //     console.log('Error occured while inserting data in DB' + err)
  //     // callback(err, 'Error')
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Error occured while inserting data in DB')
  //   })
  kafka.make_request('post_message', req.body, function (err, results) {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while inserting data in DB')
      console.log('Unable get data')
    } else {
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Successfully Registered')
    }
  })
})


router.post('/messagessearchbar', (req, res) => {
  console.log("Inside Search Bar Post Request");
  console.log("Req Body : ", req.body);
  msg = req.body;
  console.log("Inside Search Bar Service");
  const search_term = msg.text.trim()
  console.log(search_term)
  User.find({ username: { $regex: '.*' + search_term + '.*', $options: 'i' } })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
      res.end("done!");
    })
    .catch(err => {
      console.log(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      })
      res.end("Kuch jol search kiya tune bhai!!");
    })

  // kafka.make_request('post_messagessearchbar', req.body, function (err, results) {
  //   console.log('in result');
  //   console.log(results);
  //   if (err || results === "error") {
  //     res.writeHead(404, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end("Kuch jol search kiya tune bhai!!");
  //   } else {
  //     res.status(200).json(results);
  //     res.end("done!");
  //   }
  // });

});

router.post('/messagedetails', function (req, res) {
  console.log('Inside message details' + JSON.stringify(req.body))
  let msg = req.body;
  // messages
  //   .find(
  //     {
  //       $or: [{
  //         sender_name: msg.sender_name,
  //         receiver_name: msg.receiver_name
  //       }, {
  //         sender_name: msg.receiver_name,
  //         receiver_name: msg.sender_name
  //       }]
  //     }
  //   )
  //   .then(results => {
  //     console.log('Successfully fetched data from DB')
  //     console.log(JSON.stringify(results))
  //     // callback(null, results)
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     })
  //     res.end(JSON.stringify(results))
  //   })
  //   .catch(err => {
  //     console.log('Error occured while fetching data from DB')
  //     // callback(err, 'Error')
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Error occured while fetching data from DB')
  //     console.log('Unable get data')
  //   })
  kafka.make_request('message_details', req.body, function (err, results) {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while fetching data from DB')
      console.log('Unable get data')
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(results))
    }
  })
})

router.post('/receivermessageslist', function (req, res) {
  console.log('Inside message receivermessageslist' + JSON.stringify(req.body))
  let msg = req.body;
  messages.distinct(
    "receiver_name", { sender_name: msg.sender_name })
    .then(results => {
      console.log('Successfully fetched data from DB')
      console.log(JSON.stringify(results))
      // callback(null, results)
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(results))
    })
    .catch(err => {
      console.log('Error occured while fetching data from DB')
      // callback(err, 'Error')
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while fetching data from DB')
      console.log('Unable get data')
    })

  // kafka.make_request('recievermessages_list', req.body, function (err, results) {
  //   if (err) {
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Error occured while fetching data from DB')
  //     console.log('Unable get data')
  //   } else {
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     })
  //     res.end(JSON.stringify(results))
  //   }
  // })
})


router.post('/sendermessageslist', function (req, res) {
  console.log('Inside message sendermessageslist' + JSON.stringify(req.body))
  // let msg = req.body;
  // console.log(msg.receiver_name)
  // messages.distinct(
  //   "sender_name", { receiver_name: msg.sender_name })
  //   .then(results => {
  //     console.log('Successfully fetched data from DB')
  //     console.log(JSON.stringify(results))
  //     // callback(null, results)
  //     res.writeHead(200, {
  //       'Content-Type': 'application/json'
  //     })
  //     res.end(JSON.stringify(results))
  //   })
  //   .catch(err => {
  //     console.log('Error occured while fetching data from DB')
  //     // callback(err, 'Error')
  //     res.writeHead(400, {
  //       'Content-Type': 'text/plain'
  //     })
  //     res.end('Error occured while fetching data from DB')
  //     console.log('Unable get data')
  //   })

  kafka.make_request('sendermessages_list', req.body, function (err, results) {
    if (err) {
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      })
      res.end('Error occured while fetching data from DB')
      console.log('Unable get data')
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      })
      res.end(JSON.stringify(results))
    }
  })
})




module.exports = router
