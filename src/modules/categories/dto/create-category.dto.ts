import { IsString } from "@nestjs/class-validator";

export class CreateCategoryDto {

    @IsString()
    description: string;
}
