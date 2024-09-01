import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/auth.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { login: email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { id, username, isAdmin } = user;
      return { id, username, isAdmin };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: JwtPayloadDto) {
    const payload = {
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
  }

  async register(
    email: string,
    password: string,
    name: string,
    username: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        login: email,
        name,
        username,
        password: hashedPassword,
      },
    });
    return user;
  }
}
