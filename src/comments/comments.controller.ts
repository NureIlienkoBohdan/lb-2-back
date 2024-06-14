import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts/:postId/comments')
@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  findAll(@Param('postId') postId: number): Promise<Comment[]> {
    return this.commentsService.findAll(postId);
  }

  @Post()
  create(
    @Param('postId') postId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.create(postId, createCommentDto);
  }
}
