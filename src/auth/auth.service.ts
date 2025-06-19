// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { hashPassword, comparePassword } from '../common/utils/hash.util';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponseDto> {
    const existingUser = await this.userService.findByEmail(dto.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const hashed = await hashPassword(dto.password);
    const user = await this.userService.create({
      ...dto,
      password: hashed,
    });

    this.logger.log(`New user registered: ${dto.email}`);
    return this.generateToken(user);
  }

  async login(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user || !(await comparePassword(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    this.logger.log(`User logged in: ${dto.email}`);
    return this.generateToken(user);
  }

  private generateToken(user: Partial<User>): AuthResponseDto {
    const payload = { sub: user.id, email: user.email };

    const userResponse: UserResponseDto = {
      id: user.id!,
      email: user.email!,
      name: user.name!,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userResponse,
    };
  }
}
