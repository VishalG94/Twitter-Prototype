const User = require('../../api/models/user');

function handle_request(msg, callback) {
  console.log("Inside Search Bar Service");
  const search_term = msg.text.trim()
  console.log(search_term)
  User.find({ username: { $regex: '.*' + search_term + '.*', $options: 'i' } })
    .exec()
    .then(res => {
      console.log(res);
      callback(null, { res: res });
    })
    .catch(err => {
      console.log(err);
      callback(null, "error")
    })
}


exports.handle_request = handle_request;