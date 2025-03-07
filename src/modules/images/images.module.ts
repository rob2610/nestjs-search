import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ImagesController } from './images.controller';
import { ImageService } from './images.service';
import { SerperApiModule } from '../serperApi/serper.module';

@Module({
  imports: [HttpModule, SerperApiModule],
  controllers: [ImagesController],
  providers: [ImageService],
})
export class ImagesModule {}
