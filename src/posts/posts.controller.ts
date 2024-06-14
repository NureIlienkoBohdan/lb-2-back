import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Post> {
    return this.postsService.findOne(id);
  }

  @HttpPost()
  create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postsService.create(createPostDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePostDto: CreatePostDto,
  ): Promise<Post> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postsService.remove(id);
  }
}
