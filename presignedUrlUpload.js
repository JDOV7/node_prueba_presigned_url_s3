/**
 * Programa para crear una url preasignada para la subida de archivos
 * 
 * CONFIGURACION CORS BUCKET:
 * [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT"
        ],
        "AllowedOrigins": [
            "http://localhost:5173"
        ],
        "ExposeHeaders": []
    }
]
 * 
 *
 * **/

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const generateWebFormS3URL = async (event) => {
  try {
    let REGION = "us-east-1";
    let BUCKET = "mi-primer-bucket-ejemplo";
    let KEY = event.key;

    const client = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: "<ACCESS KEY>",
        secretAccessKey: "<SECRET ACCESS KEY>",
      },
    });
    const command = new PutObjectCommand({ Bucket: BUCKET, Key: KEY });

    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });
    console.log("Presigned URL:", presignedUrl);

    return {
      status: "Success",
      message: presignedUrl,
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
const date = new Date().getTime();
const res = await generateWebFormS3URL({
  key: `2024-07-16 17-39-19_${date}.webm`,
});
console.log(res);
