import { Test, TestingModule } from '@nestjs/testing';
import { AnimalImageService } from './animal-image.service';

describe('AnimalImageService', () => {
  let service: AnimalImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnimalImageService],
    }).compile();

    service = module.get<AnimalImageService>(AnimalImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
