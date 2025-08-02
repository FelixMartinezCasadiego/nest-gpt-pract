import * as path from 'path';
import * as fs from 'fs';
import { NotFoundException } from '@nestjs/common';

export const textToAudioGetterUseCase = async (fileId: string) => {
  const filePath = path.resolve(
    __dirname,
    '../../../generated/audios',
    `${fileId}.mp3`,
  );

  if (!fs.existsSync(filePath)) {
    throw new NotFoundException(`File ${fileId} not found`);
  }

  return filePath;
};
