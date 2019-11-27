const Tweet = require('../api/models/tweet');
const User = require('../api/models/user');
var passport = require('passport');
require('../config/passport')(passport);

function handle_request(msg, callback) {
  console.log("Inside Write Tweet Service");
  console.log(msg);

  const temp = msg.data.body;
  const data = JSON.parse(temp);
  console.log(data);

  User.find({ email: data.email })
    .then(result => {
      console.log(result);
      const tweet = new Tweet({
        text: data.text,
        image: msg.filepath,
        owner: result._id,

      });

      tweet.save()
        .then(result => {
          console.log(result);
          callback(null, "Success Tweet");
        })
        .catch(err => {
          console.log(err);
          callback(err, null);
        })
    })
}

exports.handle_request = handle_request;