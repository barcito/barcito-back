import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy( Strategy, 'jwt-refresh' ){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                RefreshTokenStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            secretOrKey: "" + process.env.JWT_REFRESH_SECRET,
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any){
        const refreshToken = req.cookies.refreshToken;
        return { ...payload, refreshToken };
    }

    private static extractJWT(req: Request): string | null {
        if (
          req.cookies &&
          'refreshToken' in req.cookies &&
          req.cookies.refreshToken.length > 0
        ) {
          return req.cookies.refreshToken;
        }
        return null;
    }
}