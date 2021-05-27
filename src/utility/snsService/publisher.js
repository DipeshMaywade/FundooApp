const logger = require('../logger');
const { sns } = require('../../../config/awsConfig');
require('dotenv').config();

class Publisher {
  publish = (firstName) => {
    let params = {
      Message: `Hii ${firstName}, Welcome Back to the Fundoo Note`,
      Subject: 'Fundoo App',
      TopicArn: process.env.SNS_ARN,
    };

    sns.publish(params, (err, data) => {
      err ? logger.log('error', `from sns publisher ${err}`) : logger.log('info', `from sns publisher ${data}`);
    });
  };
}

module.exports = new Publisher();
