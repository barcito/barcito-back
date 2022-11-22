import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { receiptFileFilter } from 'files/helpers/receiptFileFilter.helper';
import { diskStorage } from 'multer';
import { receiptFileNamer } from 'files/helpers/receiptFileName.helper';

@ApiTags('Receipts')
@Controller('receipts/:barcito')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  async create(
    @Param('barcito', ParseIntPipe) barcito: number,
    @Body() createReceiptDto: CreateReceiptDto,
  ) {
    const receipt = await this.receiptsService.create(
      barcito,
      createReceiptDto,
    );
    return receipt;
  }

  @Get()
  findAll(@Param('barcito', ParseIntPipe) barcito: number) {
    return this.receiptsService.findAll(barcito);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receiptsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReceiptDto: UpdateReceiptDto,
  ) {
    return this.receiptsService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receiptsService.remove(id);
  }

  @Patch('/document-update/:id')
  @UseInterceptors(
    FileInterceptor('receipt_doc', {
      fileFilter: receiptFileFilter,
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: '../files-storage/receipts',
        filename: receiptFileNamer,
      }),
    }),
  )
  documentUpdate(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException('Make sure document is of a valid type');

    const updateReceiptDto: UpdateReceiptDto = {
      receiptPath: `${process.env.HOST_API}files/receipts/${file.filename}`,
    };
    return this.receiptsService.update(id, updateReceiptDto);
  }
}
