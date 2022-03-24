import { Test, TestingModule } from '@nestjs/testing';
import { MongoTestService } from './mongo-test.service';

describe('MongoTestService', () => {
  let provider: MongoTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoTestService],
    }).compile();

    provider = module.get<MongoTestService>(MongoTestService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
