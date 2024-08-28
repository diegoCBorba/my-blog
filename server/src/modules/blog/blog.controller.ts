import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '9',
    @Query('tag') tag?: string,
    @Query('search') search?: string,
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    return this.blogService.findAll(pageNumber, pageSize, tag, search);
  }

  @Get('grouped-by-tag')
  async findAllGroupedByTag() {
    return this.blogService.findAllGroupedByTag();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.blogService.findOneBySlug(slug);
  }
}
