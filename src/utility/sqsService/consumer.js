const { Consumer } = require('sqs-consumer');
const logger = require('../logger');
const aws = require('../../../config/awsConfig');

require('dotenv').config();

module.exports = consumefromSQS = () => {
  const queueUrl = process.env.SQS_URL;

  function sendMail(message) {
    let sqsMessage = JSON.parse(message.Body);
    const params = {
      Destination: {
        ToAddresses: [sqsMessage.userEmail],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<head>
                 <title>Reset Password</title>
             </head>
             <body>
                 <h3>Hello ${sqsMessage.userEmail}</h3>
                 <h4> Your Reset Password Token is: ${sqsMessage.token}  </h4>
                 <h4> Thank You </h4>
             </body>`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Reset Password',
        },
      },
      Source: process.env.EMAIL,
    };

    aws.ses.sendEmail(params, (err, data) => {
      err ? logger.log('error', `Error From ses SendEmail ${err}`) : logger.log('info', `From ses SendMail ${data}`);
    });
  }

  // Create our consumer
  const app = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: async (message) => {
      sendMail(message);
    },
    sqs: aws.sqs,
  });

  app.on('error', (err) => {
    console.error(err.message);
  });

  app.on('processing_error', (err) => {
    console.error(err.message);
  });

  console.log('Emails service is running');
  app.start();
};
