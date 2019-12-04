var redis = require('redis');
var redisClient = redis.createClient();

redisClient.on('connect', function () {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong while connecting redis' + err);
});

module.exports = { redisClient };