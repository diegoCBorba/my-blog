import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 9,
    @Query('tagId') tagId?: number,
    @Query('search') search?: string,
  ) {
    return this.blogService.findAll(
      Number(page),
      Number(limit),
      Number(tagId),
      search,
    );
  }

  @Get('grouped-by-tag')
  async findAllGroupedByTag() {
    return this.blogService.findAllGroupedByTag();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.blogService.findOneBySlug(slug);
  }

  @Get(':slug/isUnique')
  async isSlugUnique(@Param('slug') slug: string) {
    return this.blogService.isSlugUnique(slug);
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }
}
