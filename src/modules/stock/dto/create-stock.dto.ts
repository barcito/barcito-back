import { IsArray, IsEnum, IsNumber, IsString } from "@nestjs/class-validator";
import { StockType } from "enums/stock-type.enum";

export class CreateStockDto {
    @IsEnum(StockType)
    type: StockType;

    @IsString()
    description: string;

    @IsNumber()
    cost: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    warning: number;

    @IsNumber()
    barcitoId: number;
}
