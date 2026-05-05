import { Test, TestingModule } from '@nestjs/testing';
import { AnimalImageController } from './animal-image.controller';
import { beforeEach, describe, it } from 'node:test';

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
function expect(controller: AnimalImageController) {
  throw new Error('Function not implemented.');
}

