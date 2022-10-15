import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'modules/users/dto/create-user.dto';
import { UsersService } from 'modules/users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { Role } from 'enums/role.enum';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ){}

  /**
   * 
   * @param createUserDto 
   * Check if the user already exists using the provided email
   * Creates the new user, with hashed password, logs in the user using getTokens()
   * and sets their refresh tokens in the db
   * @returns Promise with tokens
   */
  async signUp(createUserDto: CreateUserDto): Promise<any>{
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if(userExists){
      throw new BadRequestException('User already exists');
    }
    const newUser = await this.usersService.create(createUserDto);
    const tokens = await this.getTokens(newUser.id, newUser.email, newUser.roles);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return { ...tokens, newUser};
  }

  /**
   * 
   * @param data 
   * Check if provided credentials are correct
   * Logs in the user using getTokens() and sets their refresh token in the db
   * @returns object with tokens
   */
  async signIn(data: AuthDto){
    const user = await this.usersService.findByEmail(data.email);
    if(!user) throw new BadRequestException('Bad credentials');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if(!passwordMatches) throw new BadRequestException('Bad credentials');
    const tokens = await this.getTokens(user.id, user.email, user.roles);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user};
  }

  /**
   * 
   * @param userId 
   * Logs out the user setting their refresh token to null in the db
   * @returns 
   */
  async logout(userId: number){
    return this.usersService.update(userId, { refreshToken: null });
  }

  /**
   * 
   * @param data 
   * Uses the library argon2 to hash the provided data
   * @returns hashed data string
   */
  hashData(data: string){
    return argon2.hash(data);
  }

  /**
   * 
   * @param userId 
   * Updates the value of the property 'refreshToken' from the provided user
   * @param refreshToken 
   */
  async updateRefreshToken(userId: number, refreshToken: string){
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
  }

  /**
   * 
   * @param userId 
   * @param email 
   * @param roles 
   * Function that uses JwtService to generate tokens for the user, composed by their id, email and roles array
   * @returns object with tokens
   */
  async getTokens(userId: number, email: string, roles: Role[]){
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          roles
        },
        {
          secret: "" + this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1d'
        }
      ),
      this.jwtService.signAsync(
        {
          id: userId,
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

  /**
   * 
   * @param userId 
   * @param refreshToken 
   * Check if the user exists in the db, check if the provided refresh token
   * matches with the token stored in the db and generates a new one with getTokens()
   * @returns object with tokens
   */
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
