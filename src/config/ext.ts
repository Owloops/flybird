export const ext = {
  s3: {
    bucketName: process.env.BIRD_BUCKET || "",
  },
  captcha: {
    api: process.env.CAPTCHA_RESOLVER_API_KEY || "",
  },
  secretkey: process.env.SECRETKEY || "supersecret"
};

export const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;