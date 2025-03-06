import { Module } from '@nestjs/common';
import { ImagesModule } from './modules/images/images.module';
import { SerperApiModule } from './modules/serperApi/serper.module';

@Module({
  imports: [ImagesModule,SerperApiModule],
})
export class AppModule {}
