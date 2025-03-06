import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { API_KEY } from '../../commons/Constats';
import { lastValueFrom } from 'rxjs';
import { ISerperImage } from './serper.model';

@Injectable()
export class SerperApiService {
  constructor(private httpService: HttpService) {}

  async getImages(query: string = '', num: number = 10, page: number = 1,): Promise<ISerperImage[]> {
    const url = this.buildUrl(query, num, page);
    const response = await this.imagesRequest(url)
    return this.imageResponse(response.data);
  }

  private buildUrl(query: string, num: number, page: number): string {
    if (!query.trim()) {
      throw new HttpException('Query cannot be empty', HttpStatus.BAD_REQUEST);
    }
    return `https://google.serper.dev/images?q=${(query)}&num=${num}&page=${page}&apiKey=${API_KEY}`;
  }

  private async imagesRequest(url:string) {
    try {
      return lastValueFrom(this.httpService.get<{ images: ISerperImage[] }>(url));
    }catch(error) {
      console.error('Error into Request', error);
      throw new HttpException('Error into Request', HttpStatus.INTERNAL_SERVER_ERROR,);
    }
  }

  private imageResponse(response: { images: ISerperImage[] }): ISerperImage[] {
    return response.images;
  }



}
