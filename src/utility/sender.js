require('dotenv').config();
var ejs = require('ejs');
const amqplib = require('amqplib/callback_api');

class Publish {
  getMessage = (email, token) => {
    // Create connection to AMQP server
    amqplib.connect('amqp://localhost', (err, connection) => {
      if (err) {
        console.error(err);
        return process.exit(1);
      }

      // Create channel
      connection.createChannel((err, channel) => {
        if (err) {
          console.error(err.stack);
          return process.exit(1);
        }

        // Ensure queue for messages
        channel.assertQueue(
          'EmailInQueues1',
          {
            // Ensure that the queue is not deleted when server restarts
            durable: true,
          },
          (err) => {
            if (err) {
              return process.exit(1);
            }

            // Create a function to send objects to the queue
            // Javascript object is converted to JSON and then into a Buffer
            let sender = (content, next) => {
              console.log('hello');
              let sent = channel.sendToQueue(
                'EmailInQueues1',
                Buffer.from(JSON.stringify(content)),
                {
                  // Store queued elements on disk
                  persistent: true,
                  contentType: 'application/json',
                }
              );
              if (sent) {
                return next();
              } else {
                channel.once('drain', () => next());
              }
            };

            // push messages to queue
            let sent = 0;
            let sendNext = async () => {
              ejs.renderFile('src/views/resetPassword.ejs', (err, result) => {
                if (err) {
                  logger.log('error', err);
                }
                if (sent >= 1) {
                  console.log(' messages sent!');
                  // Close connection to AMQP server
                  // We need to call channel.close first, otherwise pending
                  // messages are not written to the queue
                  return channel.close(() => connection.close());
                }
                sent++;
                sender(
                  {
                    to: email,
                    subject: 'Reset Password' + sent,
                    html: `${result}<h4> ${token} </h4>`,
                  },
                  sendNext
                );
              });
            };
            sendNext();
          }
        );
      });
    });
  };
}

module.exports = new Publish();
