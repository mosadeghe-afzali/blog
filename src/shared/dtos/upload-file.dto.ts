import { ApiProperty } from "@nestjs/swagger";

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    required: true,
    format: 'binary'
  })
  file: any
}