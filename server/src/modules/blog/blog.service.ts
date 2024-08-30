import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    page: number = 1,
    limit: number = 9,
    tag?: string,
    search?: string,
  ) {
    // Ajustar valores padrão
    const pageNumber = page < 1 ? 1 : page;
    const pageSize = limit < 1 ? 9 : limit;

    // Construir o filtro
    const whereClause = {
      ...(tag && { tag: { name: tag } }),
      ...(search && { title: { contains: search, mode: 'insensitive' } }),
    };

    // Obter a contagem total de blogs que correspondem ao filtro
    const totalCount = await this.prisma.blog.count({
      where: whereClause,
    });

    // Obter os blogs com base na paginação e filtro
    const blogs = await this.prisma.blog.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
      include: {
        tag: true, // Incluir a tag relacionada
      },
    });

    // Formatar a resposta
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
        tag: true, // Incluir a tag relacionada para exibir outras informações se necessário
        author: true, // Se você quiser incluir informações sobre o autor
        comments: true, // Se você quiser incluir os comentários
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog with slug "${slug}" not found`);
    }

    return {
      slug: `${blog.tag.slug}/${blog.slug}`, // Formatar o slug como na listagem
      cover: blog.cover,
      title: blog.title,
      description: blog.description,
      content: blog.content, // Incluir o conteúdo completo
      tag: blog.tag.name,
      author: blog.author.name,
      publishedDate: blog.publishedDate,
      comments: blog.comments, // Opcional: retornar comentários
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
