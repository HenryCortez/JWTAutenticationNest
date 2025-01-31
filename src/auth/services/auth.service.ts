import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from '../interfaces/auth.repository';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterAuthDto } from '../dtos/register-auth.dto';
import { PrismaClient, Role, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthRepository {
  constructor(private prisma: PrismaClient,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    var validate = await this.validateUser(loginUserDto);
    console.log("--------------------");
    console.log(validate);

    if (!validate) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: loginUserDto.email,
      id: validate.id,
      role: validate.role
    };

    var token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }

  async register(registerDto: RegisterAuthDto): Promise<User> {
    try {
      return this.prisma.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          passwordHash: registerDto.passwordHash!,
          passwordSalt: registerDto.passwordSalt!,
          role: registerDto.role || Role.CLIENT,

        }
      });
    } catch (error) {
      throw new HttpException('Error creando el usuario, este ya existe', 500);
    }
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.findUserByEmail(loginUserDto.email);
    

    if (
      user &&
      (await bcrypt.compare(loginUserDto.password, user.passwordHash))
    ) {
      const { passwordHash, passwordSalt, ...result } = user;
      
      return result;
    }
    return null;
  }

  private async findUserByEmail(email: string): Promise<User> {
    let user;
      user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: email
        }
      }).catch((error) => {return null});
      
      if (!user) {
        user = await this.prisma.user.findUniqueOrThrow({
          where: {
            username: email
          }
        }).catch((error) => {return null});
      }
  
    
    return user;
  }
}
