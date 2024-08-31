import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async findByBlogId(blogId: number) {
    return this.prisma.comment
      .findMany({
        where: { blogId },
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              username: true,
              id: true, // Inclui o id do usuário
            },
          },
        },
      })
      .then((comments) =>
        comments.map((comment) => ({
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt.toISOString(),
          name: comment.user.name,
          username: comment.user.username,
          idUser: comment.user.id,
        })),
      );
  }

  async create(createCommentDto: CreateCommentDto) {
    const { content, blogId, userId } = createCommentDto;
    return this.prisma.comment.create({
      data: {
        content,
        blogId,
        userId,
      },
    });
  }
}
