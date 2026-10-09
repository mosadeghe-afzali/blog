import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { BlogDto } from '../dtos/blog.dto.js';
import { BlogService } from '../services/blog.service.js';
import { BlogQueryDto } from '../dtos/blog-query.dto.js';

@ApiTags('blog')
// @ApiHeader({
//     name: 'apikey',
//     description: 'api key'
// })
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get()
    findAll(@Query() queryParam: BlogQueryDto) {
        console.log('controller')
        return this.blogService.findAll(queryParam);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(id);
    }

    @Post()
    create(@Body() body: BlogDto) {
        return this.blogService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: BlogDto) {
        return this.blogService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.blogService.delete(id);
    }
}
