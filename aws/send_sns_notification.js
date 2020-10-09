const {sprintf} = require('sprintf-js');

/** Send a notification to AWS SNS

  {
    aws_access_key_id: <AWS Access Key Identifier String>
    aws_region: <AWS SNS Region Identifier String>
    aws_secret_access_key: <AWS Access Key Secret Token String>
    [input]: <Notification Input String>
    [is_nonzero]: <Avoid Notification When Output Equals Zero Bool>
    [is_test]: <Avoid Publishing Message Bool>
    logger: {
      info: <Log Info Statement Function>
    }
    message: <Message Body String>
    sns: {
      publish: () => {
        promise: () => <Promise>
      }
    }
    [subject]: <Subject Title String>
    topic: <Topic Identifier String>
  }

  @returns via Promise
*/
module.exports = args => {
  return new Promise(async (resolve, reject) => {
    if (!args.aws_access_key_id) {
      return reject(new Error('ExpectedAwsAccessKeyIdToSendSnsNotification'));
    }

    if (!args.aws_region) {
      return reject(new Error('ExpectedAwsRegionIdentifierToSendSns'));
    }

    if (!args.aws_secret_access_key) {
      return reject(new Error('ExpectedAwsSecretAccessKeyToSendSns'));
    }

    if (!args.logger) {
      return reject(new Error('ExpectedWinstonLoggerWhenSendingNotification'));
    }

    if (!args.message) {
      return reject(new Error('ExpectedMessageToSendNotificationToSns'));
    }

    if (!args.sns) {
      return reject(new Error('ExpectedSnsToSendNotificationToSns'));
    }

    if (!args.topic) {
      return reject(new Error('ExpectedSnsTopicIdentifierToSendNotification'));
    }

    // Exit early when output is zero but notification is for non-zero outputs
    if (!!args.is_nonzero && args.input === Number().toString()) {
      return resolve();
    }

    const message = sprintf(args.message, args.input);
    const subject = args.subject || undefined;

    if (!!subject) {
      args.logger.info(subject);
    }

    args.logger.info(message);

    // Exit early when just testing out the message
    if (!!args.is_test) {
      return resolve();
    }

    const notification = {
      Message: message,
      Subject: subject,
      TopicArn: args.topic,
    };

    process.env.AWS_ACCESS_KEY_ID = args.aws_access_key_id;
    process.env.AWS_REGION = args.aws_region;
    process.env.AWS_SECRET_ACCESS_KEY = args.aws_secret_access_key;

    await args.sns.publish(notification).promise();

    return resolve();
  });
};
