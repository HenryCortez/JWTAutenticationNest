import { Role } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";


export class RegisterAuthDto {
    @MinLength(4)
    @IsNotEmpty()
    username: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    //@IsStrongPassword()
    @IsNotEmpty()
    password: string;
    passwordHash?: string;

    passwordSalt?: string;

    role?:     Role;
}
