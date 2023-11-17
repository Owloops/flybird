import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const s3Client = new S3Client({
  region: "us-east-1",
  apiVersion: "latest"
});

export const uploadFileToS3 = async (bucket: string, buffer: string | Buffer, fileName: string) => {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ACL: 'public-read'
    }
  });

  await upload.done();

  return `https://${bucket}.s3.amazonaws.com/${encodeURIComponent(fileName)}`;
};
