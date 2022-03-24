import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewJediDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  masterId: string;

  @IsBoolean()
  @IsNotEmpty()
  isAlive: boolean;
}
