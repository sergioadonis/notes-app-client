export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "sa-notes-upload-bucket"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://ouhd25m7zh.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_mG0ehPPY9",
    APP_CLIENT_ID: "4o7ti9pfqo5rk1ku791dijbfm8",
    IDENTITY_POOL_ID: "us-east-1:d8912aba-bed0-4ca4-94fd-d460f3c34cf0"
  }
};
