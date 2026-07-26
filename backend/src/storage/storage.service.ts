import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.CLOUDFLARE_R2_BUCKET || 'somadeiras-storage';
    
    // Connect to Cloudflare R2 using standard S3 API client
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY || '',
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY || '',
      },
    });
  }

  /**
   * Upload a raw file (Buffer) directly to Cloudflare R2
   */
  async uploadFile(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
    try {
      this.logger.log(`Uploading file ${fileName} to Cloudflare R2 bucket ${this.bucketName}...`);
      
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType,
      });

      await this.s3Client.send(command);
      
      // Return public R2 URL
      const publicUrl = `${process.env.CLOUDFLARE_R2_ENDPOINT}/${this.bucketName}/${fileName}`;
      this.logger.log(`File successfully uploaded. Public URL: ${publicUrl}`);
      return publicUrl;
    } catch (error) {
      this.logger.error(`Error uploading file to Cloudflare R2: ${error.message}`, error.stack);
      throw error;
    }
  }

  /**
   * Generate a secure, pre-signed temporary download URL for sensitive PDFs
   */
  async getPresignedDownloadUrl(fileName: string, expiresInSeconds: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: expiresInSeconds });
      return signedUrl;
    } catch (error) {
      this.logger.error(`Error generating pre-signed URL for ${fileName}: ${error.message}`);
      throw error;
    }
  }
}
