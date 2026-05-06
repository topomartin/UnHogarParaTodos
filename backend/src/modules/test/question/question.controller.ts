import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from 'src/common/database/entities/question.entity';

@Controller('questions')
export class QuestionController {

  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>
  ) {}

  // 🔥 LISTAR 
  @Post()
  async findAll(@Body() filter: any) {

    const page = filter.page || 1;
    const limit = filter.limit || 10;

    const [data, total] = await this.questionRepo.findAndCount({
      relations: ['answers'],
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      data,
      meta: {
        total
      }
    };
  }

  // 🔥 CREAR 
  @Post('create')
  create(@Body() data: any) {
    console.log('BODY CREATE QUESTION:', data);
    return this.questionRepo.save(data);
  }

  // 🔥 UPDATE 
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: any
  ) {
    await this.questionRepo.update(id, data);

    return {
      message: 'Pregunta actualizada'
    };
  }

  // 🔥 DELETE
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.questionRepo.delete(id);

    return {
      message: 'Pregunta eliminada'
    };
  }
}