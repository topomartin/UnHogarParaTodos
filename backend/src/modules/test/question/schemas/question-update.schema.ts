export const QuestionUpdateSchema = {
  fields: [
    {
      key: 'id',
      label: 'ID',
      type: 'number',
      readonly: true
    },
    {
      key: 'question_text',
      label: 'Pregunta',
      type: 'text',
      required: true
    }
  ]
};