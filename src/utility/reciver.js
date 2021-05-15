require('dotenv').config();
const amqplib = require('amqplib/callback_api');
const nodemailer = require('nodemailer');

class Subscriber {
  consumeMessage = () => {
    // Setup Nodemailer transport
    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
    });

    // Create connection to AMQP server
    amqplib.connect('amqp://localhost', (err, connection) => {
      if (err) {
        return err;
      }
      // Create channel
      connection.createChannel((err, channel) => {
        if (err) {
          return err;
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
              return err;
            }

            // Only request 1 unacked message from queue
            // This value indicates how many messages we want to process in parallel
            channel.prefetch(1);

            // Set up callback to handle messages received from the queue
            channel.consume('EmailInQueues1', (data) => {
              if (data === null) {
                console.log('null data');
                return;
              }

              // Decode message contents
              let message = JSON.parse(data.content.toString());

              // attach message specific authentication options
              // this is needed if you want to send different messages from
              // different user accounts
              message.auth = {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
              };

              // Send the message using the previously set up Nodemailer transport
              transport.sendMail(message, (err, info) => {
                if (err) {
                  console.log('getting error in sending data', err);
                  // put the failed message item back to queue
                  return channel.nack(data);
                }
                console.log('Delivered message %s', info.messageId);
                // remove message item from the queue
                channel.ack(data);
                return message.link;
              });
            });
          }
        );
      });
    });
  };
}

module.exports = new Subscriber();
