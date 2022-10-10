import { join } from 'path';
import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';

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

  getApplicationDoc(docName: string) {
    const path = join(
      __dirname,
      '../../../files-storage/applications',
      `${docName}`,
    );

    if (!existsSync(path))
      throw new BadRequestException('Application document not found');

    return path;
  }

  getProductImage(imageName: string) {
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
