import { IsNumber } from "@nestjs/class-validator";

export class CreateStockDto {
    @IsNumber()
    cost: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    warning: number;
}
