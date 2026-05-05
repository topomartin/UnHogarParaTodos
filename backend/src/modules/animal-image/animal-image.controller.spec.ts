import { Test, TestingModule } from '@nestjs/testing';
import { AnimalImageController } from './animal-image.controller';

describe('AnimalImageController', () => {
  let controller: AnimalImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalImageController],
    }).compile();

    controller = module.get<AnimalImageController>(AnimalImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
