import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common/interfaces';

/**
 * Guard that protects the resource from being accessed without authentication
 */
@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt'){
    constructor(private readonly reflector: Reflector){
        super();
    }

    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler()
        );

        if(isPublic){
            return true;
        }

        return super.canActivate(context);
    }
}