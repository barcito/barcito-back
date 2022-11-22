import { ApiProperty } from "@nestjs/swagger";
import { Role } from "enums/role.enum";

export class AuthDto {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    roles: Role[];
}
