const { ses } = require('../../../config/awsConfig');
const logger = require('../logger');

class Verify {
  verifyMail = (email) => {
    var params = {
      EmailAddress: email,
    };

    ses.verifyEmailAddress(params, function (err, data) {
      err ? logger.log('error', `Error from ses verify mail ${err}`) : logger.log('info', `info from ${data}`);
    });
  };
}

module.exports = new Verify();
