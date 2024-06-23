import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import {User} from "../entities/user.entity";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginResponseDto {
    token: string;
    user: User;
}
