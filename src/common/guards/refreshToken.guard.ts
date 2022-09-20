import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard only used to refresh tokens
 */
@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh'){}