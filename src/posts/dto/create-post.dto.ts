import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the Post',
    example: 'My first post',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The content of the Post',
    example: 'This is the content of my first post',
  })
  @IsString()
  content: string;
}
