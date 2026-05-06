import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './services/test.service';
import { TestRepositoryService } from './services/test.repository.service';
import { TestController } from './test.controller';
import { Question } from "src/common/database/entities/question.entity";
import { Answer } from "src/common/database/entities/answer.entity";
import { UserAnswer } from "src/common/database/entities/user-answer.entity";
import { Animal } from 'src/common/database/entities/animal.entity';
import { QuestionController } from './question/question.controller';
import { AnswerController } from './answers/answer.controller';
import { QuestionSchemaController } from './question/question-schema.controller';
import { AnswerSchemaController } from './answers/answer-schema.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, UserAnswer, Animal])],
  providers: [TestService,TestRepositoryService],
  controllers: [
    TestController,
    QuestionController,
    AnswerController,
    QuestionSchemaController,
    AnswerSchemaController
  ],
  exports: [TestService]
})
export class TestModule {}