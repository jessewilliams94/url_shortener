import AWS from 'aws-sdk';

const REGION = "us-east-2"; 

AWS.config.update({
  region: REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  }
});

export const dynamodb = new AWS.DynamoDB();
