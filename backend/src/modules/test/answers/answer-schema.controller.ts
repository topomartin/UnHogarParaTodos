import { Controller, Get } from '@nestjs/common';
import { AnswerGridSchema } from './schemas/answer-grid.schema';
import { AnswerCreateSchema } from './schemas/answer-create.schema';
import { AnswerUpdateSchema } from './schemas/answer-update.schema';

@Controller('answers/schema')
export class AnswerSchemaController {

  @Get('gridSchema')
  getGrid() {
    return AnswerGridSchema;
  }

  @Get('createSchema')
  getCreate() {
    return AnswerCreateSchema;
  }

  @Get('updateSchema')
  getUpdate() {
    return AnswerUpdateSchema;
  }
}