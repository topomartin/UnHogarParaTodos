export const AnswerCreateSchema = {
  fields: [
    {
      key: 'answer_text',
      label: 'Respuesta',
      type: 'text',
      required: true
    },
    {
      key: 'question_id',
      label: 'ID Pregunta',
      type: 'number',
      required: true
    },
    {
      key: 'value',
      label: 'Valor',
      type: 'number',
      required: true
    }
  ]
};