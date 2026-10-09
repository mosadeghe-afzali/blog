import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LogType } from "../schemas/log.schema.js";

export class LogDto {
  @IsNotEmpty()
  @IsString()
  content: string

  @IsNotEmpty()
  @IsString()
  url: string

  @IsNotEmpty()
  @IsEnum(LogType)
  type: LogType
}