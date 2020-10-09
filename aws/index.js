const {apiVersion} = require('./configuration');
const sendSnsNotification = require('./send_sns_notification');

module.exports = {apiVersion, sendSnsNotification};
