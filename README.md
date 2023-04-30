# Send Notification

[![npm version](https://badge.fury.io/js/sendnotification.svg)](https://badge.fury.io/js/sendnotification)
[![Coverage Status](https://coveralls.io/repos/github/alexbosworth/sendnotification/badge.svg?branch=master)](https://coveralls.io/github/alexbosworth/sendnotification?branch=master)
[![Build Status](https://travis-ci.org/alexbosworth/sendnotification.svg?branch=master)](https://travis-ci.org/alexbosworth/sendnotification)

Relay notifications based in stdin data

```
echo "5000" | sendnotification SNS "SNS_TOPIC_IDENTIFIER" "the current balance is %d"

// the current balance is 5000
```

## Configuration

Set environment variables or setup ~/.sendnotification/.env

```ini
# AWS configuration settings
AWS_ACCESS_KEY_ID=""
AWS_REGION=""
AWS_SECRET_ACCESS_KEY=""

# Mailjet configuration settings
MJ_APIKEY_PRIVATE=""
MJ_APIKEY_PUBLIC=""
```

## Docker

There is an included Docker file, as well as a public image at alexbosworth/sendnotification

Example usage with Docker, referencing a .env file with the environment variables encoded:

```
echo "5000" | docker run -i --rm --env-file .env alexbosworth/sendnotification SNS "sns-topic-id" "the current balance is %d"
```

This should post the notification body to the specified topic, with the sprintf'ed contents
