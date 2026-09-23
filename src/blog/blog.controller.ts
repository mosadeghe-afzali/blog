import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { BlogDto } from './dtos/blog.dto.js';

@Controller('blog')
export class BlogController {

    @Get()
    findAll() {
        return 'find all'
    }

    @Get('category')
    findAllCategories() {
        return "find all categories"
    }

    @Get(':id')
    findOne(@Param('id') id :any) {
        console.log(id)
        return 'find one';
    }

    @Post()
    create(@Body() body :BlogDto) {
        console.log(body);
        return('create');
    }

    @Put(':id')
    update(@Param('id') id :any, @Body() body :BlogDto) {
        console.log(id, body);
        return 'update';
    }

    @Delete(':id')
    delete(@Param('id') id :any) {
        console.log(id)
        return 'delete'
    }
}
