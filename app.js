import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  getSignedUrl,
  S3RequestPresigner,
} from "@aws-sdk/s3-request-presigner";

const createPresignedUrlWithClient = ({ region, bucket, key }) => {
  const client = new S3Client({
    region,
    credentials: {
      accessKeyId: "<ACCESS KEY>",
      secretAccessKey: "<SECRET ACCESS KEY>",
    },
  });
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 20 });
};

export const main = async () => {
  const REGION = "us-east-1";
  const BUCKET = "bucket-ejercicio-auth";
  const KEY = "manifestacion_valor_plantilla__page-0001.jpg";

  try {
    const clientUrl = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });

    console.log("Presigned URL with client");
    console.log(clientUrl);
  } catch (err) {
    console.error(err);
  }
};

main();

