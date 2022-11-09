import { IsNumber } from "@nestjs/class-validator";

export class CreateOrderedProductDto {
    @IsNumber()
    quantity: number;
    
    @IsNumber()
    productId: number;
}
