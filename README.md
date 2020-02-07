# Send Notification

Relay notifications based in stdin data

```
echo "5000" | sendnotification SNS "SNS_TOPIC_IDENTIFIER" "the current balance is %d"

// the current balance is 5000
```

## Configuration

Set environment variables or setup ~/.sendnotification/.env

```ini
AWS_ACCESS_KEY_ID=""
AWS_REGION=""
AWS_SECRET_ACCESS_KEY=""
```
