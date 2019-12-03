const messages = require('../../api/models/message')

function handle_request(msg, callback) {
    messages.distinct(
        "sender_name", { receiver_name: msg.sender_name })
        .then(results => {
            console.log('Successfully fetched data from DB')
            console.log(JSON.stringify(results))
            callback(null, results)
        })
        .catch(err => {
            console.log('Error occured while fetching data from DB')
            callback(err, 'Error')
        })
}

exports.handle_request = handle_request