import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    const secret = this.configService.get<string>('JWT_SECRET');

    try {
      const decoded: any = jwt.verify(token, secret);

      if (decoded && decoded.isAdmin) {
        return true;
      } else {
        throw new ForbiddenException('Access denied');
      }
    } catch (error) {
      throw new ForbiddenException('Invalid or expired token');
    }
  }
}
