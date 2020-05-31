import { Module } from '@nestjs/common';
import { LightsService } from './lights.service';
import { LightsController } from './lights.controller';

@Module({
  providers: [LightsService],
  controllers: [LightsController]
})
export class LightsModule {}
