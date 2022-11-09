import { IsString, IsNumberString } from "@nestjs/class-validator";

export class CreateCategoryDto {
    @IsString()
    description: string;

    @IsNumberString()
    barcitoId: number;
}
