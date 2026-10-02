import sharp from 'sharp'
import * as mkdirp from 'mkdirp'
import fs from 'fs';

export const SaveImage = async (file: Express.Multer.File) => {
  const destination = 'file/';
  const fileName = new Date().toISOString() + '-' + file.originalname.split('.')[0]
    + '.webp';

  mkdirp.sync(destination + 'main');
  mkdirp.sync(destination + 'resized');

  await sharp(file.buffer).webp().toFile(destination + '/main/' + fileName);
  await sharp(file.buffer).webp().resize({
    width: 200,
    height: 200
  }).toFile(destination + '/resized/' + fileName);

  return fileName;
};

export const SaveImages = async (files: Array<Express.Multer.File>) => {
  const destination = 'file/';

  mkdirp.sync(destination + 'main');
  mkdirp.sync(destination + 'resized');
  const fileNames = []

  for await (const file of files) {
    const fileName = new Date().toISOString() + '-' + file.originalname.split('.')[0]
      + '.webp';



    await sharp(file.buffer).webp().toFile(destination + '/main/' + fileName);
    await sharp(file.buffer).webp().resize({
      width: 200,
      height: 200
    }).toFile(destination + '/resized/' + fileName);

    fileNames.push(fileName)
  }


  return fileNames;
};

export const deleteImage = async (
  fileName: string,
  folder: string = ''
) => {
  const imagePath = 'file' + folder;

  try {
    fs.promises.unlink(`${imagePath}/main/${fileName}`);
    fs.promises.unlink(`${imagePath}/resized/${fileName}`);

  } catch (error) {
    console.log(error)
  }
}