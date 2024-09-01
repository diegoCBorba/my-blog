import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        blogs: true,
        comments: true,
      },
    });

    if (!user) {
      throw new Error(`User with Email ${id} not found`);
    }

    return user;
  }
}
