import { Test, TestingModule } from '@nestjs/testing';
import { BuyProductsController } from './buy-products.controller';
import { BuyProductsService } from './buy-products.service';

describe('BuyProductsController', () => {
  let controller: BuyProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyProductsController],
      providers: [BuyProductsService],
    }).compile();

    controller = module.get<BuyProductsController>(BuyProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
