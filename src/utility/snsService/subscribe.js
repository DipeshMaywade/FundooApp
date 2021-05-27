const logger = require('../logger');
const { sns } = require('../../../config/awsConfig');
require('dotenv').config();

class Subscriber {
  subs = (email) => {
    let params = {
      Protocol: 'EMAIL',
      TopicArn: process.env.SNS_ARN,
      Endpoint: email,
    };

    sns.subscribe(params, (err, data) => {
      err ? logger.log('error', `from sns ${err}`) : logger.log('info', `from sns ${data}`);
    });
  };
}

module.exports = new Subscriber();
