import { Injectable } from '@nestjs/common';
import { TestRepositoryService } from './test.repository.service';

@Injectable()
export class TestService {

    constructor(
        private testRepositoryService: TestRepositoryService
    ) { }

    // 🔥 Obtener preguntas
    async getQuestions() {
        try {
            return await this.testRepositoryService.getQuestions();
        } catch (error) {
            console.error('Error getting questions:', error);
            throw error;
        }
    }

    // 🔥 Guardar test
    async saveUserAnswers(data: any) {
        try {
            const { user_id, answers } = data;

            if (!user_id || !Array.isArray(answers) || answers.length === 0) {
                throw new Error('Datos incompletos');
            }

            await this.testRepositoryService.saveUserAnswers(user_id, answers);

            return {
                message: 'Test guardado correctamente'
            };

        } catch (error) {
            console.error('Error saving test:', error);
            throw error;
        }
    }

    async getFullResult(user_id: number) {

        const userAnswers = await this.testRepositoryService.getUserAnswers(user_id);

        const userProfile = this.mapAnswersToProfile(userAnswers);

        const animals = await this.testRepositoryService.getAllAnimalsWithProfile();

        const normalize = (val: any) =>
            val?.toString().toLowerCase().trim();

        const results = animals.map(animal => {

            let score = 0;
            let total = 0;

            const profile = animal.profile;

            // ⚡ ENERGY (USANDO TU ENTITY REAL)
            if (profile?.energy_level) {
                total++;

                const userEnergy =
                    userProfile.energy === 'alta' ? 'high' :
                        userProfile.energy === 'media' ? 'medium' :
                            'low';

                if (normalize(userEnergy) === normalize(profile.energy_level)) {
                    score++;
                }
            }

            // 👶 KIDS
            if (profile?.good_with_kids !== null) {
                total++;

                if (userProfile.kids === profile.good_with_kids) {
                    score++;
                }
            }

            // 🏠 HOUSE (corrigiendo mismatch Piso vs flat)
            if (profile?.preferred_housing_type) {
                total++;

                const mapHouse = (h: string) => {
                    const v = normalize(h);
                    if (v === 'piso') return 'flat';
                    if (v === 'casa') return 'house';
                    if (v === 'chalet') return 'house';
                    return v;
                };

                if (mapHouse(userProfile.house) === normalize(profile.preferred_housing_type)) {
                    score++;
                }
            }

            // 🧠 EXPERIENCE
            if (profile?.needs_experience !== null) {
                total++;

                if (!userProfile.experience && profile.needs_experience) {
                    score++;
                } else if (userProfile.experience && !profile.needs_experience) {
                    score++;
                }
            }

            const compatibility =
                total === 0 ? 0 : Math.round((score / total) * 100);

            return {
                animal,
                compatibility
            };
        });

        return {
            userProfile,
            recommendations: results
                .filter(r => r.compatibility >= 40 || r.compatibility === 100)
                .sort((a, b) => b.compatibility - a.compatibility)
                .slice(0, 6)
        };
    }

    private mapAnswersToProfile(answers: any[]) {

        const profile: any = {};

        answers.forEach(a => {

            const text = a.answer?.answer_text?.toLowerCase();

            switch (a.question_id) {

                case 1:
                    if (text.includes('alta')) profile.energy = 'alta';
                    else if (text.includes('media')) profile.energy = 'media';
                    else profile.energy = 'baja';
                    break;

                case 2:
                    profile.kids = text === 'sí';
                    break;

                case 3:
                    profile.house = text; // "piso", "casa", etc
                    break;

                case 5:
                    profile.experience = text === 'sí';
                    break;
            }
        });

        return profile;
    }


}