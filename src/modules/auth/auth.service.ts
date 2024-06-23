import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto, LoginResponseDto} from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto): Promise<User> {
        const { username, email, name, phoneNumber, password } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userModel.create({
            username,
            password: hashedPassword,
            email,
            name,
            phoneNumber,
        });
    }

    async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
        return this.userModel.findOne({ $or: [{username} , {email}] });
    }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({ username }).lean();
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const user = await this.validateUser(loginDto.username, loginDto.password);
        if(!user) return null;
        return {
            token: this.jwtService.sign(user),
            user: user
        };
    }
}
