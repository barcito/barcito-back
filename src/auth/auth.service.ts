import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Role } from 'src/users/entities/role.enum';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  async signUp(createUserDto: CreateUserDto): Promise<any>{
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if(userExists){
      throw new BadRequestException('User already exists');
    }
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash
    });
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.roles);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthDto){
    const user = await this.usersService.findByEmail(data.email);
    if(!user) throw new BadRequestException('Bad credentials');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if(!passwordMatches) throw new BadRequestException('Bad credentials');
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number){
    return this.usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string){
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string){
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
  }

  async getTokens(userId: number, email: string, roles: Role[]){
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles
        },
        {
          secret: "" + this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m'
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          roles
        },
        {
          secret: "" + this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d'
        }
      )
    ]);

    return {
      accessToken,
      refreshToken
    }
  }

  async refreshTokens(userId: number, refreshToken: string){
    const user = await this.usersService.findById(userId);
    if(!user || !user.refreshToken){
      throw new ForbiddenException('Access Denied');
    }
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken
    );
    if(!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
