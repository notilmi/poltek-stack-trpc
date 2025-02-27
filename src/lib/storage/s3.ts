import { S3Client } from "@aws-sdk/client-s3";

const s3AccessKey = process.env.S3_ACCESS_KEY;
const s3SecretKey = process.env.S3_SECRET_KEY;
export const s3Bucket = process.env.S3_BUCKET;

if (!s3AccessKey || !s3SecretKey || !s3Bucket) {
  throw new Error("S3_ACCESS_KEY and S3_SECRET_KEY must be provided in .env");
}

export const s3 = new S3Client({
  region: process.env.S3_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: s3SecretKey,
  },
  endpoint: process.env.S3_ENDPOINT,
});
