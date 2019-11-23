const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser')
let cors = require('cors')
app.use(bodyParser.json())
let dateforamt = require('dateformat')
const messages = require('../../../api/models/message')
let mogooseConn = require('../../../sql/mongoose')
// var dateforamt = require('dateformat')
// const mongoose = require('mongoose')
let kafka = require('../../../kafka/client')

router.post('/postmessage', function (req, res) {
  console.log('Inside messages Post Request')
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

router.post('/messagedetails', function (req, res) {
  console.log('Inside menu details' + JSON.stringify(req.body))
  let msg = req.body;
  messages
    .find(
      {
        $or: [{
          sender_name: msg.sender_name,
          receiver_name: msg.receiver_name
        }, {
          sender_name: msg.receiver_name,
          receiver_name: msg.sender_name
        }]
      }
    )
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
  // kafka.make_request('message_details', req.body, function (err, results) {
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

module.exports = router
