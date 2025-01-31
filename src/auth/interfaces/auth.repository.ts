import { User } from "@prisma/client";
import { LoginUserDto } from "../dtos/login-user.dto";
import { RegisterAuthDto } from "../dtos/register-auth.dto";

export interface AuthRepository {
    login(loginUserDto: LoginUserDto): Promise<any>;
    register(registerDto: RegisterAuthDto): Promise<User>;
    validateUser(loginUserDto: LoginUserDto): Promise<any>;
}
