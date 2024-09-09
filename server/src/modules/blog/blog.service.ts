import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number = 1,
    limit: number = 9,
    tagId?: number,
    search?: string,
  ) {
    const pageNumber = page < 1 ? 1 : page;
    const pageSize = limit < 1 ? 9 : limit;

    const whereClause = {
      ...(tagId ? { tagId } : {}),
      ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
    };

    const blogs = await this.prisma.blog.findMany({
      where: {
        ...whereClause,
        ...(search && { title: { contains: search.toLowerCase() } }),
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        tag: true,
      },
      orderBy: {
        publishedDate: 'desc',
      },
    });

    const totalCount = await this.prisma.blog.count({
      where: {
        ...whereClause,
        ...(search && { title: { contains: search.toLowerCase() } }),
      },
    });

    // const whereClause = {
    //   ...(tagId ? { tagId } : {}),
    //   ...(search ? { title: { contains: search, mode: 'insensitive' } } : {}),
    // };

    // const totalCount = await this.prisma.blog.count({
    //   where: whereClause,
    // });

    // const blogs = await this.prisma.blog.findMany({
    //   where: whereClause,
    //   skip: (pageNumber - 1) * pageSize,
    //   take: pageSize,
    //   include: {
    //     tag: true,
    //   },
    //   orderBy: {
    //     publishedDate: 'desc',
    //   },
    // });

    const data = blogs.map((blog) => ({
      slug: `${blog.tag.slug}/${blog.slug}`,
      cover: blog.cover,
      title: blog.title,
      description: blog.description,
      tag: blog.tag.name,
    }));

    return {
      data,
      totalPages: Math.ceil(totalCount / pageSize),
    };
  }

  async findOneBySlug(slug: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { slug },
      include: {
        tag: true,
        author: true,
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with slug "${slug}" not found`);
    }

    return {
      id: blog.id,
      slug: `${blog.tag.slug}/${blog.slug}`,
      cover: blog.cover,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      tag: blog.tag.name,
      author: blog.author.name,
      publishedDate: blog.publishedDate,
    };
  }

  async findAllGroupedByTag() {
    // Obtém as tags e blogs associados
    const tags = await this.prisma.tag.findMany({
      include: {
        blogs: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    });

    const additionalTag = {
      tag: 'Iniciando',
      blogs: [
        { title: 'Home', slug: '/' },
        { title: 'Galeria', slug: '/galeria' },
      ],
    };

    const result = [
      additionalTag,
      ...tags
        .filter((tag) => tag.blogs.length > 0)
        .map((tag) => ({
          tag: tag.name,
          blogs: tag.blogs.map((blog) => ({
            slug: `/${tag.slug}/${blog.slug}`,
            title: blog.title,
          })),
        })),
    ];

    return result;
  }

  async create(createBlogDto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        cover: createBlogDto.cover,
        content: createBlogDto.content,
        description: createBlogDto.description,
        slug: createBlogDto.slug,
        tag: { connect: { id: createBlogDto.tagId } },
        author: { connect: { id: createBlogDto.authorId } },
      },
    });
  }

  async isSlugUnique(slug: string): Promise<{ isUnique: boolean }> {
    const blog = await this.prisma.blog.findUnique({
      where: { slug },
    });

    return { isUnique: !blog };
  }
}
