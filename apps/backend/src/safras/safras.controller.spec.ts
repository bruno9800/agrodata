import { Test, TestingModule } from '@nestjs/testing';
import { SafrasController } from './safras.controller';
import { SafrasService } from './safras.service';

describe('SafrasController', () => {
  let controller: SafrasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SafrasController],
      providers: [SafrasService],
    }).compile();

    controller = module.get<SafrasController>(SafrasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
