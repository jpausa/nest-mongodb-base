import { Controller, Get } from '@nestjs/common';
import { TestService } from '../providers/test.service';

@Controller()
export class TestController {
  constructor(private readonly appService: TestService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
