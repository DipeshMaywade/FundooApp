require('dotenv').config();
var ejs = require('ejs');
const amqplib = require('amqplib/callback_api');
const logger = require('./logger');

class Publish {
  sentToQueue = (email, token) => {
    amqplib.connect('amqp://localhost', (err, connection) => {
      if (err) {
        logger.log('error', `Error from amqplib.connect ${err}`);
      }
      connection.createChannel((err, channel) => {
        if (err) {
          logger.log('error', `Error from connection.createChannel ${err}`);
        }
        channel.assertQueue('sentEmail', { durable: true }, (err) => {
          if (err) {
            logger.log('error', `Error from channel.assertQueue ${err}`);
          }
          let sender = (content, next) => {
            let sent = channel.sendToQueue('sentEmail', Buffer.from(JSON.stringify(content)), {
              // Store queued elements on disk
              persistent: true,
              contentType: 'application/json',
            });
            if (sent) {
              return next();
            } else {
              channel.once('drain', () => next());
            }
          };

          let sent = 0;
          let sendNext = async () => {
            ejs.renderFile('src/views/resetPassword.ejs', (err, result) => {
              if (err) {
                logger.log('error', err);
              }
              if (sent >= 1) {
                console.log(' messages sent!');
                return channel.close(() => connection.close());
              }
              sent++;
              sender(
                {
                  to: email,
                  subject: 'Reset Password',
                  html: `${result}<h4> ${token} </h4>`,
                },
                sendNext
              );
            });
          };
          sendNext();
        });
      });
    });
  };
}

module.exports = new Publish();
