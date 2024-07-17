import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
const REGION = "us-east-1";
const BUCKET = "mi-primer-bucket-ejemplo";
const KEY = "2024-07-16 17-39-19.webm";
const subirVideo = async ({ region, bucket, key }) => {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: "<ACCESS KEY>",
      secretAccessKey: "<SECRET ACCESS KEY>",
    },
  });

  const url = "C:\\Users\\jesus\\Videos\\2024-07-16 17-39-19.webm";
  const file = await fs.readFileSync(url);
  console.log(file);
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: file,
  };
  const data = await client.send(new PutObjectCommand(uploadParams));
  return data;
  // const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  // return getSignedUrl(client, command, { expiresIn: 20 });
};

console.log(
  await subirVideo({
    region: REGION,
    bucket: BUCKET,
    key: KEY,
  })
);
