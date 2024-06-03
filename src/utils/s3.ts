import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
  }
});

const BUCKET_NAME = 'twitter-dev-mannjneff';

export const uploadS3 = async ({
  fileName,
  file,
  ContentType = 'image/jpeg'
}: {
  fileName: string;
  file: Buffer;
  ContentType?: string;
}) => {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: file,
    ContentType
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
