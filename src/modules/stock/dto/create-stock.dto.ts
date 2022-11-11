import { IsArray, IsEnum, IsNumber, IsString } from "@nestjs/class-validator";
import { StockType } from "enums/stock-type.enum";
import { Category } from "modules/categories/entities/category.entity";

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

    @IsArray()
    categories: Category[];
}
