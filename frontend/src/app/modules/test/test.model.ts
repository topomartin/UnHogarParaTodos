export interface Answer {
  id: number;
  answer_text: string;
  value: number;
}

export interface Question {
  id: number;
  question_text: string;
  answers: Answer[];
}