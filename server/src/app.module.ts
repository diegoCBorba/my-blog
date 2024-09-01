import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TagModule } from './modules/tag/tag.module';
import { CommentModule } from './modules/comment/comment.module';
import { BlogModule } from './modules/blog/blog.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    BlogModule,
    CommentModule,
    TagModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
