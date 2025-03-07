import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ImageService } from './images.service';
import { ImageList } from './image.model';

@Controller()
export class ImagesController {
  constructor(private readonly searchService: ImageService) {}

  @Get()
  getRoot() {
    return {
      message: 'Welcome to Root of ImageController',
    };
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('images')
  async getImages(
    @Query('query') query: string,
    @Query('num') num?: number,
    @Query('page') page?: number,
  ): Promise<ImageList> {
    return this.searchService.getImages(query, num, page);
  }
}
