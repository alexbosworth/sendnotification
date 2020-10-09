const {test} = require('tap');

const {sendSnsNotification} = require('./../../aws');

const makeArgs = overrides => {
  const args = {
    aws_access_key_id: 'aws_access_key_id',
    aws_region: 'aws_region',
    aws_secret_access_key: 'aws_secret_access_key',
    logger: {info: () => {}},
    message: 'message',
    sns: {publish: () => ({promise: () => new Promise(resolve => resolve())})},
    topic: 'topic',
  };

  Object.keys(overrides).forEach(k => args[k] = overrides[k]);

  return args;
};

const tests = [
  {
    args: makeArgs({aws_access_key_id: undefined}),
    description: 'An aws access key is required',
    error: 'ExpectedAwsAccessKeyIdToSendSnsNotification',
  },
  {
    args: makeArgs({aws_region: undefined}),
    description: 'An aws region is required',
    error: 'ExpectedAwsRegionIdentifierToSendSns',
  },
  {
    args: makeArgs({aws_secret_access_key: undefined}),
    description: 'An aws secret is required',
    error: 'ExpectedAwsSecretAccessKeyToSendSns',
  },
  {
    args: makeArgs({logger: undefined}),
    description: 'A logger is required',
    error: 'ExpectedWinstonLoggerWhenSendingNotification',
  },
  {
    args: makeArgs({message: undefined}),
    description: 'A message is required',
    error: 'ExpectedMessageToSendNotificationToSns',
  },
  {
    args: makeArgs({sns: undefined}),
    description: 'A sns object is required',
    error: 'ExpectedSnsToSendNotificationToSns',
  },
  {
    args: makeArgs({topic: undefined}),
    description: 'A topic is required',
    error: 'ExpectedSnsTopicIdentifierToSendNotification',
  },
  {
    args: makeArgs({
      input: '0',
      is_nonzero: true,
      logger: {info: () => new Error('NothingShouldBeLogged')},
    }),
    description: 'Zero output can be ignored',
  },
  {
    args: makeArgs({is_test: true, sns: {}, subject: 'subject'}),
    description: 'A test notification is triggered',
  },
  {
    args: makeArgs({}),
    description: 'A notification is sent',
  },
];

tests.forEach(({args, description, error, expected}) => {
  return test(description, async ({deepEqual, end, equal, rejects}) => {
    if (!!error) {
      await rejects(sendSnsNotification(args), new Error(error), 'Got error');
    } else {
      await sendSnsNotification(args);
    }

    return end();
  });
});
