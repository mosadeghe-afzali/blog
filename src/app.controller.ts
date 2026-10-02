import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service.js';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import type { Multer } from 'multer'; // ایمپورت مستقیم تایپ Multer
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UploadFileDto } from './shared/dtos/upload-file.dto.js';
import { deleteImage, SaveImage, SaveImages } from './shared/utils/file-utils.js';
import { UploadFilesDto } from './shared/dtos/upload-files.dto copy.js';
import { DeleteFileDto } from './shared/dtos/delete-file.dto.js';
@Controller()
@ApiTags('shared')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('upload-file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 20000000,
        }),
        new FileTypeValidator({
          fileType: 'image/png'
        })
      ]
    })
  ) file: Express.Multer.File,
  ) {
    console.log(file);
    return SaveImage(file);
  }


  @Post('upload-files')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFilesDto,
  })
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return SaveImages(files);
  }

  @Delete('delete-file')
  deleteFile(@Body() body: DeleteFileDto) {
    deleteImage(body.fileName);
  }
}
