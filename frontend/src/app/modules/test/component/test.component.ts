import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { Question } from '../test.model';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  standalone: false
})
export class TestComponent implements OnInit {

  questions: Question[] = [];
  answersSelected: { [key: number]: number } = {};

  loading = false;
  started = false;
  finished = false;
  result: any = null;
  loadingResult = false;
  recommendations: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void { }

  startTest() {
    this.started = true;
    this.finished = false;
    this.loading = true;

    this.getQuestions();
  }

  getQuestions() {
    this.apiService.get('test/questions').subscribe({
      next: (data: any) => {
        this.questions = data;
        this.loading = false;

        this.cdr.detectChanges(); // 🔥 FORZAR ACTUALIZACIÓN
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  selectAnswer(questionId: number, answerId: number) {
    this.answersSelected[questionId] = answerId;
  }

  submitTest() {
    const total = this.questions.length;
    const answered = Object.keys(this.answersSelected).length;
    const user = this.authService.getCurrentUser();

    if (answered < total) {
      alert('Responde todas las preguntas');
      return;
    }

    const payload = {
      user_id: user.id,
      answers: Object.keys(this.answersSelected).map(qId => ({
        question_id: Number(qId),
        answer_id: this.answersSelected[Number(qId)]
      }))
    };

    this.apiService.post('test/submit', payload).subscribe({
      next: () => {
        this.getResult();
      },
      error: () => {
        alert('Error al enviar el test');
      }
    });
  }

  getResult() {
    const user = this.authService.getCurrentUser();

    this.apiService.post('test/result', {
      user_id: user.id
    }).subscribe({
      next: (res) => {
        this.result = res;

        this.finished = true;
        this.started = false;

        this.answersSelected = {};
        this.questions = [];
        this.recommendations = res.recommendations;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loadingResult = false;
      }
    });
  }
}

/*
questions 
id question_text
1	¿Cuál es tu nivel de actividad?
2	¿Tienes niños en casa?
3	¿Qué tipo de vivienda tienes?
4	¿Cuánto tiempo puedes dedicar a tu mascota?
5	¿Tienes experiencia con animales?
*/ 

/*
answers
id question_id answer_text value
1	1	Bajo	1
2	1	Medio	2
3	1	Alto	3
4	2	Sí	2
5	2	No	1
6	3	Piso	1
7	3	Casa con jardín	3
8	4	Poco tiempo	1
9	4	Tiempo moderado	2
10	4	Mucho tiempo	3
11	5	Sí	3
12	5	No	1
*/