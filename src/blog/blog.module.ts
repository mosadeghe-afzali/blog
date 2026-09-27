import { Module } from '@nestjs/common';
import { BlogController } from './controllers/blog.controller.js';
import { BlogService } from './services/blog.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, blogSchema } from './schemas/blog.schema.js';
import { BlogCategoryController } from './controllers/blog-category.controller.js';
import { BlogCategoryService } from './services/blog-category.service.js';
import { BlogCategory, BlogCategorySchema } from './schemas/blog-category.schema.js';

@Module({
  imports: [MongooseModule.forFeature(
    [{
      name: Blog.name,
      schema: blogSchema
    },
    {
      name: BlogCategory.name,
      schema: BlogCategorySchema
    }
  ]
  )],
  controllers: [BlogController, BlogCategoryController],
  providers: [BlogService, BlogCategoryService]
})
export class BlogModule { }
