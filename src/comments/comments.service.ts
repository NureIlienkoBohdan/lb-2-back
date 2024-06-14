import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
    });
    const comment = this.commentsRepository.create({
      ...createCommentDto,
      post,
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(postId: number): Promise<Comment[]> {
    return this.commentsRepository.find({ where: { post: { id: postId } } });
  }
}
