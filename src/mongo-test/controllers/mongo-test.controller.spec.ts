import { Test, TestingModule } from '@nestjs/testing';
import { MongoTestController } from './mongo-test.controller';

describe('MongoTestController', () => {
  let controller: MongoTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoTestController],
    }).compile();

    controller = module.get<MongoTestController>(MongoTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
