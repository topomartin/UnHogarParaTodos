import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TestService } from './services/test.service';

@Controller('test')
export class TestController {

  constructor(private testService: TestService) { }

  @Get('questions')
  getQuestions() {
    return this.testService.getQuestions();
  }

  @Post('submit')
  submitTest(@Body() body: any) {
    return this.testService.saveUserAnswers(body);
  }

  @Post('result')
  getResult(@Body() body: { user_id: number }) {
    return this.testService.getFullResult(body.user_id);
  }
}