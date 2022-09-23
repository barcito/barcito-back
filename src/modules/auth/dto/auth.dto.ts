import { Role } from "enums/role.enum";

export class AuthDto {
    email: string;
    password: string;
    roles: Role[];
}
