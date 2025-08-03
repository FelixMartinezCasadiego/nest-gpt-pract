import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AudioFileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/mp4',
    'audio/wav',
    'audio/m4a',
    'audio/aac',
    'audio/ogg',
    'audio/webm',
    'audio/flac',
    'audio/x-wav',
    'audio/x-m4a',
  ];

  private readonly maxSize = 1000 * 1024 * 5; // 5MB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validar tamaño
    if (file.size > this.maxSize) {
      throw new BadRequestException('File is bigger than 5 MB');
    }

    // Validar tipo MIME
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Expected audio file, but received: ${file.mimetype}`,
      );
    }

    return file;
  }
}
