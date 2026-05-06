export const AnswerGridSchema = {
  displayedColumns: [
    {
      key: 'id',
      label: 'ID'
    },
    {
      key: 'answer_text',
      label: 'Respuesta'
    },
    {
      key: 'question.question_text',
      label: 'Pregunta'
    }
  ]
};