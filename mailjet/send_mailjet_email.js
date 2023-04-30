const {Client} = require('node-mailjet');

const defaultSubject = 'Notification';
const statusOk = 200;
const version = 'v3.1';

/** Send a notification using Mailjet

  {
    from: <From Source Email Address String>
    html: <Message HTML String>
    subject: <Email Subject String>
    mj_apikey_private: <Mailjet Private API Key String>
    mj_apikey_public: <Mailjet Public API Key String>
    text: <Message Text String>
    to: <Send to Email Address Destination String>
  }

  @returns via Promise
*/
module.exports = args => {
  return new Promise(async (resolve, reject) => {
    const mailjet = new Client({
      apiKey: args.mj_apikey_public,
      apiSecret: args.mj_apikey_private,
    });

    const {response} = await mailjet.post('send', {version}).request({
      Messages: [{
        From: {Email: args.from},
        To: [{Email: args.to}],
        Subject: args.subject || defaultSubject,
        HTMLPart: args.html,
        TextPart: args.text,
      }],
    });

    if (response.status !== statusOk) {
      return reject(new Error('ExpectedSuccessStatusWhenSendingMailjetEmail'));
    }

    return resolve();
  });
};
