/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { logger } from "../../../shared/logger";
import config from "../../../config";

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.aws.access_key!,
    secretAccessKey: config.aws.secret_key!,
  },
  region: config.aws.region,
});

const uploadFile = async (fileBuffer: Buffer, originalname: string, contentType: string, folderName: string): Promise<string> => {
  const safeName = originalname.replace(/\s/g, '_');

  const key = `${folderName}/${uuidv4()}-${safeName}`;
  console.log(key, "key+++")
  const uploadParams = {
    Bucket: config.aws.bucket_name,
    Body: fileBuffer,
    ContentType: contentType,
    Key: key,
  };

  try {
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    const fileUrl = `https://${config.aws.bucket_name}.s3.amazonaws.com/${key}`;
    return fileUrl;
  } catch (error) {
    logger.error("Error uploading file to S3:", error);
    throw error;
  }
};

const deleteFile = async (key: string): Promise<void> => {
  const deleteParams = {
    Bucket: config.aws.bucket_name,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);
  } catch (error) {
    logger.error("Error deleting file from S3:", error);
    throw error;
  }
}


export {
  uploadFile,
  deleteFile
}