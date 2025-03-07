import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { of } from 'rxjs';
import { SerperApiService } from './serper.service';
import { ISerperImage } from './serper.model';
import { AxiosResponse } from 'axios';

describe('SerperApiService', () => {
  let service: SerperApiService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SerperApiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(), // serve per intercettare le chiamate HTTP.
          },
        },
      ],
    }).compile();
    service = module.get<SerperApiService>(SerperApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('buildUrl', () => {
    it('should throw an error if query is empty', () => {
      expect(() => service['buildUrl']('', 10, 1)).toThrow(
        new HttpException('Query cannot be empty', HttpStatus.BAD_REQUEST),
      );
    });

    it('Should return a valid url', () => {
      const url = service['buildUrl']('cagnocervo', 10, 1);
      expect(url).toContain('q=cagnocervo');
      expect(url).toContain('num=10');
      expect(url).toContain('page=1');
    });
  });

  describe('imagesRequest', () => {
    it('Should return images', async () => {
      const response = {
        data: {
          images: [
            {
              title: 'Cagnocervo',
              imageUrl: 'cagnocervo.jpg',
              imageWidth: 100,
              imageHeight: 100,
            },
          ] as ISerperImage[],
        },
      } as unknown as AxiosResponse<unknown, unknown>;

      jest.spyOn(httpService, 'get').mockReturnValue(of(response));
      const result = await service['imagesRequest']('https://test.com');
      expect(result).toEqual(response);
    });
  });

  describe('ImageResponse', () => {
    it('Should return serper images', () => {
      const response = {
        images: [
          {
            title: 'Cagnocervo',
            imageUrl: 'cagnocervo.jpg',
            imageWidth: 100,
            imageHeight: 100,
            source: 'source.com',
            domain: 'domain.com',
            googleUrl: 'google.com',
            thumbnailUrl: 'thumb.com',
            thumbnailWidth: 50,
            thumbnailHeight: 50,
            link: 'link.com',
            position: 1,
          },
        ],
      };
      expect(service['imageResponse'](response)).toEqual(response.images);
    });
  });

  describe('getImages', () => {
    it('Should fetch and process images', async () => {
      const response = {
        data: {
          images: [
            {
              title: 'Cagnocervo',
              imageUrl: 'cagnocervo.jpg',
              imageWidth: '100',
              imageHeight: '100',
            },
          ],
        },
      };

      jest
        .spyOn(service as any, 'buildUrl')
        .mockReturnValue('https://test.com');
      jest.spyOn(service as any, 'imagesRequest').mockResolvedValue(response);
      jest
        .spyOn(service as any, 'imageResponse')
        .mockReturnValue(response.data.images);

      const result = await service.getImages('cagnocervo');
      expect(result).toEqual(response.data.images);
    });
  });
});
