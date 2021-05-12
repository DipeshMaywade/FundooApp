const redis = require('redis');
const client = redis.createClient();
const { promisify } = require('util');

class Redis {
  setData = (KEY, data) => {
    client.setex(KEY, 2000, JSON.stringify(data));
  };

  getData = async (KEY) => {
    const result = await promisify(client.get).bind(client)(KEY);
    if (result) {
      return JSON.parse(result);
    }
    return result;
  };
}

module.exports = new Redis();
