import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service.js';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import type { Multer } from 'multer'; // ایمپورت مستقیم تایپ Multer
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-file.dto.js';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File,
  ) {
   console.log(file);
  }
}
