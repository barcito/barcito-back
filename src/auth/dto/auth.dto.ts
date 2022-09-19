import { Role } from "src/users/entities/role.enum";

export class AuthDto {
    email: string;
    password: string;
    roles: Role[];
}
