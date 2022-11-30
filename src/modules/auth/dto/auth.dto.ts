import { Role } from "enums/role.enum";

export class AuthDto {
    /**
     * Email de la persona que ingresa
     * @example 'test@gmail.com'
     */
    email: string;

    /**
     * Contraseña de la persona que ingresa
     * @example 'password123'
     */
    password: string;

    /**
     * Rol de la persona
     * @example ['Admin']
     */
    roles: Role[];
}
