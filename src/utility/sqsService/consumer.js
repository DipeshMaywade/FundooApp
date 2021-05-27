const { Consumer } = require('sqs-consumer');
const nodemailer = require('nodemailer');
const logger = require('../logger');
const aws = require('../../../config/awsConfig');

require('dotenv').config();

module.exports = consumefromSQS = () => {
  const queueUrl = process.env.SQS_URL;

  // Configure Nodemailer to user Gmail
  let transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.PORT_MAIL,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

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
      err ? logger.log('error', `Error From ses SendEmail ${err}`) : logger.log('inf0', `From ses SendMail ${data}`);
    });

    //   let sqsMessage = JSON.parse(message.Body);
    //   const emailMessage = {
    //     to: sqsMessage.userEmail, // Recipient address
    //     subject: 'Token For Reset Password', // Subject line
    //     html: `<head>
    //     <title>Reset Password</title>
    // </head>
    // <body>
    //     <h3>Hello ${sqsMessage.userEmail}</h3>
    //     <h4> Your Reset Password Token is: ${sqsMessage.token}  </h4>
    //     <h4> Thank You </h4>
    // </body>`,
    //   };
    //   transport.sendMail(emailMessage, (err, info) => {
    //     err ? logger.log(`info`, `${err}`) : logger.log(`error`, `${info}`);
    //   });
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
