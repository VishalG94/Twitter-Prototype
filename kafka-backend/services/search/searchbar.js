const Tweet = require('../../api/models/tweet');
const User = require('../../api/models/user');

function handle_request(msg, callback) {
  console.log("Inside Search Bar Service");
  const search_term=msg.text.trim()
  console.log(search_term)

  if(search_term[0]==='#')
  {
    Tweet.find({text: { $regex: '.*' + search_term.substr(1) + '.*' , $options: 'i' } }).populate('owner')
    .exec()
    .then(res => {
      console.log(res);
      callback(null, res);
    })
    .catch(err => {
      console.log(err);
      callback(null,"error")
    })
  }
  else
  {
    User.find({username: { $regex: '.*' + search_term + '.*' , $options: 'i' } })
    .exec()
    .then(res => {
      console.log(res);
      callback(null, res);
    })
    .catch(err => {
      console.log(err);
      callback(null,"error")
    })
  }  
}

exports.handle_request = handle_request;