import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ImageService } from './images.service';
import { Image, ImageList } from './image.model';

@Controller('images')
export class ImagesController {
  constructor(private readonly searchService: ImageService) {}

  @UsePipes(new ValidationPipe({transform: true}))
  @Get()
  async getImages(@Query('query') query: string, @Query('num') num?: number, @Query('page') page?: number): Promise<ImageList> {
    return this.searchService.getImages(query, num, page);
  }
}
