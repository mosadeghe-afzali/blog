import { ArgumentMetadata, BadRequestException, FileTypeValidator, Injectable, MaxFileSizeValidator, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImagesPipe implements PipeTransform {
  transform(files: Array<Express.Multer.File>) {
    console.log(files);
    const sizeValidator = new MaxFileSizeValidator({
      maxSize: 20000000,
    });

    const typeValidator = new FileTypeValidator({
      fileType: 'image/png'
    });
    for (const image of files) {
      if (!sizeValidator.isValid(image)) {
        throw new BadRequestException(`${image.originalname} is too large`)
      }
      if(!typeValidator.isValid(image)) {
        throw new BadRequestException(`${image.mimetype} is not accetable`)
      }
    }
    return files;
  }
}
