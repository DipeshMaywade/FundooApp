require('dotenv').config();
const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const logger = require('./logger');

class Receiver {
  consumeMessage = () => {
    const transport = nodemailer.createTransport({
      service: process.env.SERVICE,
      secure: true,
    });
    amqplib.connect('amqp://localhost', (err, connection) => {
      if (err) {
        logger.log('error', `Error from amqp connection ${err}`);
        return 'Error in consumer connection';
      }
      // Create channel
      connection.createChannel((err, channel) => {
        if (err) {
          logger.log('error', `Error from creating a channel ${err}`);
          return;
        }
        // Ensure queue for messages
        channel.assertQueue('sentEmail', { durable: true }, (err) => {
          if (err) {
            logger.log('error', `Error from assertQueue ${err}`);
            return;
          }
          channel.consume('sentEmail', (data) => {
            if (data === null) {
              console.log('null data');
              return;
            }
            let message = JSON.parse(data.content.toString());
            message.auth = {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            };
            transport.sendMail(message, (err, info) => {
              if (err) {
                logger.log('error', `Error from tansport.sendMail ${err}`);
                console.log('getting error in sending data', err);
                //item back to queue
                return channel.nack(data);
              }
              console.log(`massage sucessfully delivered ${info.messageId}`);
              // remove message item from the queue
              channel.ack(data);
            });
          });
        });
      });
    });
  };
}

module.exports = new Receiver();
