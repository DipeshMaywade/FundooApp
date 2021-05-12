const redis = require('redis');
const client = redis.createClient();
const logger = require('./logger');

class Redis {
  setData = (KEY, data) => {
    client.setex(KEY, 200, JSON.stringify(data));
  };

  getData = (KEY, callback) => {
    client.get(KEY, (error, redisData) => {
      error ? (logger.info('error in retriving data from redis', error), callback(error, null)) : callback(null, JSON.parse(redisData));
    });
  };
}

module.exports = new Redis();
