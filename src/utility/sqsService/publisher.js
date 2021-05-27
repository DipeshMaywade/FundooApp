const AWS = require('../../../config/awsConfig');
const logger = require('../logger');
require('dotenv').config();

// Create an SQS service object
const queueUrl = process.env.SQS_URL;

module.exports = sentToSQS = (email, token) => {
  let data = {
    userEmail: email,
    token: token,
  };

  let sqsData = {
    MessageAttributes: {
      userEmail: {
        DataType: 'String',
        StringValue: email,
      },
      token: {
        DataType: 'String',
        StringValue: token,
      },
    },
    MessageBody: JSON.stringify(data),
    MessageDeduplicationId: email,
    MessageGroupId: 'UserOrders',
    QueueUrl: queueUrl,
  };

  // Send the order data to the SQS queue
  let sendSqsMessage = AWS.sqs.sendMessage(sqsData).promise();

  //console.log(sendSqsMessage.MessageId);
  sendSqsMessage
    .then((data) => {
      logger.log(`info`, `${data.MessageId}`);
    })
    .catch((err) => {
      logger.log(`error`, `${err}`);
    });
};
