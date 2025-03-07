import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SerperApiService } from './serper.service';

@Module({
  imports: [HttpModule],
  providers: [SerperApiService],
  exports: [SerperApiService],
})
export class SerperApiModule {}
