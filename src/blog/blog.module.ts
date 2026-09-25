import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller.js';
import { BlogService } from './blog.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schemas/blog.schemas.js';

@Module({
  imports: [MongooseModule.forFeature(
    [{
      name: Blog.name,
      schema: blogSchema
    }]
  )],
  controllers: [BlogController],
  providers: [BlogService]
})
export class BlogModule { }
