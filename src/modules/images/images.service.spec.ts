import { SerperApiService } from '../serperApi/serper.service';
import { ImageService } from './images.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Image } from './image.model'; // Importa il modello Image

describe('ImageService', () => {
  let service: ImageService;
  let serperService: SerperApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImageService,
        {
          provide: SerperApiService,
          useValue: {
            getImages: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImageService>(ImageService);
    serperService = module.get<SerperApiService>(SerperApiService);
  });

  describe('Get images', () => {
    it('Should return an array of Image instances', async () => {
      const serperImages = [{
        title: 'Test Image',
        imageUrl: 'http://example.com/image.jpg',
        imageWidth: 100,
        imageHeight: 100,
        position: 1
      }];

      // @ts-ignore
      jest.spyOn(serperService, 'getImages').mockResolvedValue(serperImages);

      const result = await service.getImages('test');

      expect(result.images).toBeInstanceOf(Array);

      result.images.forEach(image => {
        expect(image).toBeInstanceOf(Image);
      });
    });
  });

  describe('Should correctly set nextPage', () => {
    it( 'Should set nextPage correctly when there are more images', async () => {
      const images = [{
        title: 'Test Image',
        imageUrl: 'http://example.com/image.jpg',
        imageWidth: 100,
        imageHeight: 100,
      }, {
        title: 'Test Image 2',
        imageUrl: 'http://example.com/image2.jpg',
        imageWidth: 100,
        imageHeight: 100,
      }];

      // @ts-ignore
      jest.spyOn(serperService, 'getImages').mockResolvedValue(images);

      const result = await service.getImages('test', 1, 1);

      expect(result.nextPage).toBe(2);
    });
  });
});
