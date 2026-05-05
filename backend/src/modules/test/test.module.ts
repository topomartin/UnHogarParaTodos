import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestService } from './services/test.service';
import { TestRepositoryService } from './services/test.repository.service';
import { TestController } from './test.controller';
import { Question } from "src/common/database/entities/question.entity";
import { Answer } from "src/common/database/entities/answer.entity";
import { UserAnswer } from "src/common/database/entities/user-answer.entity";
import { Animal } from 'src/common/database/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, UserAnswer, Animal])],
  providers: [TestService,TestRepositoryService],
  controllers: [TestController],
  exports: [TestService]
})
export class TestModule {}