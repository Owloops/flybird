import pkg from 'aws-sdk';
const { S3 } = pkg;
const s3 = new S3({
  apiVersion: 'latest',
  region: 'us-east-1',
});
export const uploadFileToS3 = async (
  bucket: string,
  buffer: Buffer | string,
  fileName: string
) => {
  const url = await s3
    .upload({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ACL: 'public-read',
    })
    .promise();
  return url.Location;
};
