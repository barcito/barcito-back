import { IsNumber, IsString } from "@nestjs/class-validator";
import { Product } from "modules/products/entities/product.entity";

export class CreateReceiptDto {
    @IsString()
    date: string;

    @IsNumber()
    ticket: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    amount: number;

    product: Product;
}
