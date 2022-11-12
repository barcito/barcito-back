import { IsNumber, IsOptional, IsString, IsArray } from "@nestjs/class-validator";
import { ReceiptToStock } from "modules/receipt-to-stock/entities/receipt-to-stock.entity";

export class CreateReceiptDto {
    @IsString()
    date: string;

    @IsString()
    ticket: string;

    @IsNumber()
    amount: number;

    @IsOptional()
    @IsString()
    receiptPath: string;

    @IsArray()
    receiptToStock: ReceiptToStock[];
}
