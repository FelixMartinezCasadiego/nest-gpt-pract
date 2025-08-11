import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export const imageGenerationGetterUseCase = async (fileName: string) => {
  const dirPath = path.resolve(__dirname, '../../../generated/images');

  const baseName = path.parse(fileName).name;
  const filePath = path.resolve(dirPath, `${baseName}.png`);

  if (!fs.existsSync(filePath)) {
    throw new NotFoundException(`File ${fileName} not found`);
  }

  return filePath;
};
