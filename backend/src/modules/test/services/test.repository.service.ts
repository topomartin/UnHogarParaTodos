import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from '../../../common/database/entities/question.entity';
import { UserAnswer } from '../../../common/database/entities/user-answer.entity';
import { Animal } from "src/common/database/entities/animal.entity";
import { AnimalType, EnergyLevel } from 'src/common/knowledge/enums';

@Injectable()
export class TestRepositoryService {

    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>,

        @InjectRepository(UserAnswer)
        private userAnswerRepo: Repository<UserAnswer>,

        @InjectRepository(Animal)
        private animalRepo: Repository<Animal>
    ) { }

    // 🔥 Obtener preguntas con respuestas
    async getQuestions() {
        return await this.questionRepo.find({
            relations: ['answers']
        });
    }

    // 🔥 Guardar respuestas usuario
    async saveUserAnswers(user_id: number, answers: any[]) {

        // 🔥 borrar respuestas anteriores del usuario
        await this.userAnswerRepo.delete({ user_id });

        const records = answers.map(a => {
            return this.userAnswerRepo.create({
                user_id,
                question_id: a.question_id,
                answer_id: a.answer_id
            });
        });

        return await this.userAnswerRepo.save(records);
    }

    async getUserAnswers(user_id: number) {
        return await this.userAnswerRepo.find({
            where: { user_id },
            relations: ['answer']
        });
    }

    async getAllAnimalsWithProfile() {
        return this.animalRepo.find({
            relations: ['profile']
        });
    }
}