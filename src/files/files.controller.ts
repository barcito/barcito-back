import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('barcito/:imageName')
  findBarcitoImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getBarcitoImage(imageName);

    res.sendFile(path);
  }

  // @Post('barcito')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     fileFilter: fileFilter,
  //     limits: { fileSize: 10000000 },
  //     storage: diskStorage({
  //       destination: '../files-storage/barcitos',
  //       filename: fileNamer,
  //     }),
  //   }),
  // )
  // uploadBarcitoFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file)
  //     throw new BadRequestException('Make sure image is of a valid type');

  //   const secureUrl = `${file.filename}`;
  //   return {
  //     secureUrl,
  //   };
  // }
}
