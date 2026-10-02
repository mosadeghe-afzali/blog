import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCategoryQueryDto } from '../dtos/blog-category-query.dto.js';
import { BlogCategory } from '../schemas/blog-category.schema.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { sortFunction } from '../../shared/utils/sort.utils.js';
import { BlogCategoryDto } from '../dtos/blog-category.dto.js';
import { deleteImage } from '../../shared/utils/file-utils.js';


@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectModel(BlogCategory.name) private readonly blogCategoryModel: Model<BlogCategory>
  ) { }

  async findAll(queryParam: BlogCategoryQueryDto, selectObject: any = { __v: 0 }) {
    const { limit = 5, page = 1, title, sort } = queryParam
    const query: any = {};
    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    let sortObject = sortFunction(sort);
    const blogs = await this.blogCategoryModel
      .find(query)
      .select(selectObject)
      .skip(page - 1)
      .sort(sortObject)
      .limit(limit)
      .exec();
    const count = await this.blogCategoryModel.countDocuments(query);

    return { count, blogs };
  }

  async findOne(id: string, selectObject: any = { __v: 0 }) {
    const blog = await this.blogCategoryModel
      .findOne({ _id: id })
      .select(selectObject)
      .exec();
    if (!blog) {
      throw new NotFoundException('blog not found')
    }

    return blog;
  }

  async create(body: BlogCategoryDto) {
    const newBlog = new this.blogCategoryModel(body);
    await newBlog.save();

    return newBlog;
  }

  async update(id: string, body: BlogCategoryDto) {
    const blogCategory = await this.findOne(id, { _id: 1, Image: 1 });
    if (blogCategory.image != body.image) {
      await deleteImage(blogCategory.image);
    }
    return await this.blogCategoryModel.findByIdAndUpdate(id, body, {
      new: true
    });
  }

  async delete(id: string) {
    const blogCategory = await this.findOne(id, { _id: 1, Image: 1 });
    await deleteImage(blogCategory.image);

    await blogCategory.deleteOne();
  }
}
