import { IsNumber, IsOptional, IsString } from "@nestjs/class-validator";
import { IsArray } from "class-validator";
import { ReceiptToStock } from "modules/receipt-to-stock/entities/receipt-to-stock.entity";
export class CreateReceiptDto {
    @IsString()
    date: string;

    @IsNumber()
    ticket: number;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    receiptPath: string;

    @IsArray()
    receiptToStock: ReceiptToStock[];
}
