const redis = require('redis');

const client = redis.createClient();

client.on('error', (error) => {
  console.log('Error encountered: ', error);
});
client.on('connect', () => {
  console.log('Redis Connected Successfully...');
});
