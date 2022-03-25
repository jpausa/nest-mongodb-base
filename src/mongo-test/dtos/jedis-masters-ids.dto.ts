import { IsArray, IsNotEmpty } from 'class-validator';

export class JedisMastersIdsDto {
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
