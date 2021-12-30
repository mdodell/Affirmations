import { Test, TestingModule } from '@nestjs/testing';
import { AffirmationsController } from './affirmations.controller';
import { AffirmationsService } from './affirmations.service';

describe('AffirmationsController', () => {
  let controller: AffirmationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AffirmationsController],
      providers: [AffirmationsService],
    }).compile();

    controller = module.get<AffirmationsController>(AffirmationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
