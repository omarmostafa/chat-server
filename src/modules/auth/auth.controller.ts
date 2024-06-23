import {Controller, Post, Body, UseGuards, Request, BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto, LoginResponseDto} from "./dto/login.dto";

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('users')
    async register(@Body() registerDto: RegisterDto) {
        const {username, email} = registerDto;
        const userExists = await this.authService.findByUsernameOrEmail(username, email);
        if (userExists) {
            throw new BadRequestException('Username already exists');
        }
        return this.authService.register(registerDto);
    }

    @Post('auth/login')
    async login(@Body() loginDto: LoginDto) {
        const response: LoginResponseDto = await this.authService.login(loginDto);
        if(!response) {
            throw new BadRequestException('Invalid username or password');
        }
        return response;
    }
}
