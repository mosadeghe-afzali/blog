import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogDto } from './dtos/blog.dto.js';
import { Blog } from './schemas/blog.schemas.js';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BlogQueryDto, Sort } from './dtos/blog-query.dto.js';
import { sortFunction } from '../shared/utils/sort.utils.js';

@Injectable()
export class BlogService {

  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<Blog>
  ) {}

  async findAll(queryParam: BlogQueryDto) {
    const {limit = 5 , page = 1 , title, sort} = queryParam
    const query: any = {};
    if(title) {
      query.title = {$regex: title, $options: 'i'};
    }

    let sortObject = sortFunction(sort);
    const blogs = await this.blogModel
    .find(query)
    .skip(page -1)
    .sort(sortObject)
    .limit(limit)
    .exec();
    const count = await this.blogModel.countDocuments(query);

    return {count, blogs};
  }

  async findOne(id: string) {
    const blog = await this.blogModel.findOne({_id: id}).exec();
    if(!blog) {
      throw new NotFoundException('blog not found')
    }

    return blog;
  }

  async create(body: BlogDto) {
    const newBlog = new this.blogModel(body);
    await newBlog.save();

    return newBlog;
  }

  async update(id: string, body: BlogDto) {
    const blog = await this.findOne(id);
    console.log(blog, 'bbbbbbbbbbbbbbbbbbbbbbbbbbb')
    blog.title = body.title;
    blog.content = body.content;
    await blog.save();

    return blog;
  }

  async delete(id: string) {
    const blog = await this.findOne(id);
    await blog?.deleteOne();
  }
}
