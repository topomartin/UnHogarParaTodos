import { Controller, Get } from '@nestjs/common';
import { QuestionGridSchema } from './schemas/question-grid.schema';
import { QuestionCreateSchema } from './schemas/question-create.schema';
import { QuestionUpdateSchema } from './schemas/question-update.schema';

@Controller('questions/schema')
export class QuestionSchemaController {

  @Get('gridSchema')
  getGrid() {
    return QuestionGridSchema;
  }

  @Get('createSchema')
  getCreate() {
    return QuestionCreateSchema;
  }

  @Get('updateSchema')
  getUpdate() {
    return QuestionUpdateSchema;
  }
}