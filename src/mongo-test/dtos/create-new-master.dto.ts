import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNewJediMasterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isAlive: boolean;
}
