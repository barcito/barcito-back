import { Controller, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('barcitos/:imageName')
  findBarcitoImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getBarcitoImage(imageName);

    res.sendFile(path);
  }

  @Get('applications/:docName')
  findApplicationDoc(
    @Res() res: Response,
    @Param('docName') docName: string,
  ) {
    const path = this.filesService.getApplicationDoc(docName);

    res.sendFile(path);
  }

  @Get('products/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ){
    const path = this.filesService.getProductImage(imageName);

    res.sendFile(path);
  }
}
