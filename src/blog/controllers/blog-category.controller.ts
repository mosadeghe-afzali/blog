import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { BlogCategoryDto } from '../dtos/blog-category.dto.js';
import { BlogCategoryService } from '../services/blog-category.service.js';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto.js';

@Controller('blog-category')
@ApiTags('blogCategory')
@Controller('blog-category')
export class BlogCategoryController {
  constructor(private readonly blogService: BlogCategoryService) { }

  @Get()
  findAll(@Query() queryParam: BlogCategoryQueryDto) {
    return this.blogService.findAll(queryParam);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post()
  create(@Body() body: BlogCategoryDto) {
    return this.blogService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: BlogCategoryDto) {
    return this.blogService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
