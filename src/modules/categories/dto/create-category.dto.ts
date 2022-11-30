import { IsString, IsNumber, IsBoolean, IsEnum } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryType } from "enums/category-type.enum";

export class CreateCategoryDto {
    /**
     * Tipo de categoria
     * @example ['Producto']
     */
    @IsEnum(CategoryType)
    type: CategoryType;

    /**
     * Nombre para la categoria
     * @example "Bebidas calientes"
     */
    @IsString()
    description: string;
}
