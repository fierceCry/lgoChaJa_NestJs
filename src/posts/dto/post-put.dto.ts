import { IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  postTitle: string;

  @IsOptional()
  @IsString()
  postContent: string;

  @IsOptional()
  @IsString()
  tags: string;

  @IsOptional()
  @IsString() 
  imageUrl: string;

  @IsOptional()
  @IsNumber()
  postCategory: number;
}
