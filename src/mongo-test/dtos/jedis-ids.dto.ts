import { IsArray, IsNotEmpty } from 'class-validator';

export class JedisIdsDto {
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
