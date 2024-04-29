"use strict";

var _process$env = process.env,
    PORT = _process$env.PORT,
    CONNECTION_URL = _process$env.CONNECTION_URL,
    JWT_SECRET = _process$env.JWT_SECRET,
    SENDER_EMAIL = _process$env.SENDER_EMAIL,
    EMAIL_PASSWORD = _process$env.EMAIL_PASSWORD,
    AWS_ACCESS_KEY = _process$env.AWS_ACCESS_KEY,
    AWS_SECRET_ACCESS_KEY = _process$env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME = _process$env.AWS_BUCKET_NAME,
    AWS_REGION = _process$env.AWS_REGION;
module.exports = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
  jwtSecret: JWT_SECRET,
  senderEmail: SENDER_EMAIL,
  emailPassword: EMAIL_PASSWORD,
  awsAccessKey: AWS_ACCESS_KEY,
  awsSecretAccessKey: AWS_SECRET_ACCESS_KEY,
  awsBucketName: AWS_BUCKET_NAME,
  awsRegion: AWS_REGION
};