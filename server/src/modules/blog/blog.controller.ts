import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(FileInterceptor('cover', {
    storage: diskStorage({
      destination: './public/images',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const coverPath = file ? `/images/${file.filename}` : undefined;
    return this.blogService.create(createBlogDto, coverPath);
  }
}
