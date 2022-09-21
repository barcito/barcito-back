import { join } from 'path';
import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { arrayBuffer } from 'stream/consumers';

@Injectable()
export class FilesService {
  getBarcitoImage(imageName: string) {
    const path = join(
      __dirname,
      '../../../files-storage/barcitos',
      `${imageName}`,
    );

    if (!existsSync(path))
      throw new BadRequestException('Barcito image not found');

    return path;
  }
}
