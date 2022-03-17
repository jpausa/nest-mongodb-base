import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TestService],
    }).compile();

    service = app.get<TestService>(TestService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(service.getHello()).toBe('Hello World!');
    });
  });
});
