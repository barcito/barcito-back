import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Role } from "src/users/entities/role.enum";

type JwtPayload = {
    id: number,
    email: string;
    roles: Role[];
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                AccessTokenStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            secretOrKey: process.env.JWT_ACCESS_SECRET
        });
    }

    validate(payload: JwtPayload){
        return payload;
    }

    private static extractJWT(req: Request): string | null {
        if (
          req.cookies &&
          'accessToken' in req.cookies &&
          req.cookies.accessToken.length > 0
        ) {
          return req.cookies.accessToken;
        }
        return null;
    }
}