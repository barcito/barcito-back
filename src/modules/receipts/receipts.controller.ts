import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { receiptFileFilter } from 'files/helpers/receiptFileFilter.helper';
import { diskStorage } from 'multer';
import { receiptFileNamer } from 'files/helpers/receiptFileName.helper';

@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post()
  async create(@Body() createReceiptDto: CreateReceiptDto) {
    const receipt = await this.receiptsService.create(createReceiptDto);
    return receipt;
  }

  @Get()
  findAll() {
    return this.receiptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.receiptsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReceiptDto: UpdateReceiptDto) {
    return this.receiptsService.update(id, updateReceiptDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.receiptsService.remove(id);
  }

  @Patch('/image-update/:id')
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
    @UploadedFile() file: Express.Multer.File
  ){
    if (!file)
      throw new BadRequestException('Make sure document is of a valid type');

    const updateReceiptDto: UpdateReceiptDto = {receiptPath: `${process.env.HOST_API}files/receipts/${file.filename}`};
    return this.receiptsService.update(id, updateReceiptDto);
  }
}
