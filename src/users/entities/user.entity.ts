import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.ADMIN, Role.USER]
    })
    public roles: Role[]

    @Column({unique: true})
    public email: string;

    @Column()
    public password: string;

    @Column({
        nullable: true
    })
    public refreshToken: string;
}
