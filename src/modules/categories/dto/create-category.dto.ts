import { IsString, IsNumber, IsBoolean, IsEnum } from "@nestjs/class-validator";
import { CategoryType } from "enums/category-type.enum";

export class CreateCategoryDto {
    @IsEnum(CategoryType)
    type: CategoryType;

    @IsString()
    description: string;

    @IsBoolean()
    forStock: boolean;

    @IsNumber()
    barcitoId: number;
}
