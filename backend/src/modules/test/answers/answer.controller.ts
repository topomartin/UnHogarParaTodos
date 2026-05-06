import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from 'src/common/database/entities/answer.entity';

@Controller('answers')
export class AnswerController {

  constructor(
    @InjectRepository(Answer)
    private answerRepo: Repository<Answer>
  ) {}

  // 🔥 LISTAR
@Post()
async findAll(@Body() filter: any) {

  const page = filter.page || 1;
  const limit = filter.limit || 5;

  const [data, total] = await this.answerRepo.findAndCount({
    relations: ['question'],
    skip: (page - 1) * limit,
    take: limit
  });

  return {
    data,
    meta: { total }
  };
}

  // 🔥 CREATE
  @Post('create')
  create(@Body() data: any) {
    return this.answerRepo.save({
      answer_text: data.answer_text,
      value: data.value,
      question: { id: data.question_id }
    });
  }

  // 🔥 UPDATE
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: any
  ) {
    await this.answerRepo.update(id, {
      answer_text: data.answer_text,
      value: data.value,
      question: { id: data.question_id }
    });

    return {
      message: 'Respuesta actualizada'
    };
  }

  // 🔥 DELETE
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.answerRepo.delete(id);

    return {
      message: 'Respuesta eliminada'
    };
  }
}