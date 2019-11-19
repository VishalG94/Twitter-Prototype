const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cors = require('cors')
app.use(bodyParser.json())
var dateforamt = require('dateformat')
var kafka = require('../../../kafka/client')

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

router.get('/messagedetails', function (req, res) {
  console.log('Inside menu details' + req.query.orderId)
  kafka.make_request('message_details', req.query, function (err, results) {
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
