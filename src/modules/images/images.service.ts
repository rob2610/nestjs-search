import { Injectable } from '@nestjs/common';
import { Image, ImageList } from './image.model';
import { SerperApiService } from '../serperApi/serper.service';

@Injectable()
export class ImageService {
  constructor(private serperService: SerperApiService) {}

  async getImages(
    query: string,
    num: number = 10,
    page: number = 1,
  ): Promise<ImageList> {
    try {
      const serperImages = await this.serperService.getImages(query, num+1, page);
      const images= serperImages.map((img) => new Image(img));
      return new ImageList(images, this.checkNextPage(num, page, images));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private checkNextPage( num:number, page: number, images: Image[]) {
    return images.length === num ? undefined : page+1;
  }
}


