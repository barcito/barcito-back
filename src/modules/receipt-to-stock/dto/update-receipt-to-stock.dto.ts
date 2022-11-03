import { PartialType } from '@nestjs/mapped-types';
import { CreateReceiptToStockDto } from './create-receipt-to-stock.dto';

export class UpdateReceiptToStockDto extends PartialType(CreateReceiptToStockDto) {}
