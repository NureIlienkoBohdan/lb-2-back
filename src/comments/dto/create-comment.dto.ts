import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the Comment',
    example: 'This is the content of my first comment',
  })
  @IsString()
  content: string;
}
