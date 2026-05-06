export const AnswerGridSchema = {
  displayedColumns: [
    {
      key: 'id',
      label: 'ID',
      type: 'number'
    },
    {
      key: 'answer_text',
      label: 'Respuesta',
      type: 'text'
    },
    {
      key: 'question.question_text',
      label: 'Pregunta',
      type: 'text'
    }
  ]
};