import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from '../dtos/register-auth.dto';


@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async logUser(@Res() request, @Body() logUserDto: LoginUserDto): Promise<any> {
    const userLogged: { access_token: string } =
      await this.authService.login(logUserDto);

    const decodedToken = this.jwtService.decode(userLogged.access_token);
    console.log(decodedToken);

    return request.status(HttpStatus.CREATED).json({
      user: userLogged,
    });
  }

  @Post('/register')
  async registerUser(@Res() request, @Body() user: RegisterAuthDto): Promise<any> {
    const userCreated = await  this.authService.register(user);
    return request.status(HttpStatus.CREATED).json(userCreated);
  }
 
}
