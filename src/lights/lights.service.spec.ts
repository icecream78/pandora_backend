import { Test, TestingModule } from '@nestjs/testing';
import { LightsService } from './lights.service';

describe('LightsService', () => {
  let service: LightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightsService],
    }).compile();

    service = module.get<LightsService>(LightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
