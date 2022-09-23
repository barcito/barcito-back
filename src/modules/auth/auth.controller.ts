import { Controller, Get, Post, Body, UseGuards, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenGuard } from 'common/guards/refreshToken.guard';
import { Public } from 'common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';



@Controller('auth')
export class AuthController {

  private frontendDomain = null;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
    this.frontendDomain = this.configService.get<string>('FRONTEND_DOMAIN')
  }

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, newUser } = await this.authService.signUp(createUserDto);
    response.cookie('accessToken', accessToken, { httpOnly: true, domain: this.frontendDomain });
    response.cookie('refreshToken', refreshToken, { httpOnly: true, domain: this.frontendDomain });
    return { email: newUser.email, roles: newUser.roles };
  }

  @Public()
  @Post('signin')
  async signin(@Body() data: AuthDto, @Res({ passthrough: true }) response: Response) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(data);
    response.cookie('accessToken', accessToken, { httpOnly: true, domain: this.frontendDomain });
    response.cookie('refreshToken', refreshToken, { httpOnly: true, domain: this.frontendDomain });
    return { email: user.email, roles: user.roles };
  }

  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    this.authService.logout(req.user['id']);
    response.clearCookie('accessToken', { httpOnly: true, domain: this.frontendDomain, });
    response.clearCookie('refreshToken', { httpOnly: true, domain: this.frontendDomain, });
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    response.cookie('accessToken', tokens.accessToken, { httpOnly: true, domain: this.frontendDomain });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, domain: this.frontendDomain });
  }
}
