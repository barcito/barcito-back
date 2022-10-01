import { IsString } from "@nestjs/class-validator";
import { IsNumber } from "class-validator";

export class CreateSupplyDto {
    @IsString()
    description: string;

    @IsNumber()
    buyPrice: number;

    @IsNumber()
    stock: number;

    @IsNumber()
    lowStockWarning: number;
}
