var mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://harsh123:harsh123@cluster0-gwyw6.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

//Connection pooling
// mongoose.connect('mongodb+srv://nishit:nishit@cluster0-hvg0q.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 4
//     // useMongoClient: true
// })

console.log("mongoose connected!" + mongoose)
module.exports = { mongoose };