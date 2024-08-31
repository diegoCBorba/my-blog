import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsNotEmpty()
  blogId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
