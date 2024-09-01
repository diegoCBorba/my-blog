import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class JwtPayloadDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsBoolean()
  @IsNotEmpty()
  isAdmin: boolean;
}
