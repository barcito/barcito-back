import { IsNumber } from "@nestjs/class-validator";
import { Product } from "modules/products/entities/product.entity";

export class CreateOrderedProductDto {
    @IsNumber()
    product: Product;

    @IsNumber()
    quantity: number;
}
