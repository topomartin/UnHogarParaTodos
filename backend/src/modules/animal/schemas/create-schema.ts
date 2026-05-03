import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";

export const AnimalCreateSchema = {
  fields: [
    {
      key: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      maxLength: 50
    },
    {
      key: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      values: Object.values(AnimalType)
    },
    {
      key: 'birth_date',
      label: 'Fecha de nacimiento',
      type: 'date',
      required: true
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'text',
      required: false,
      maxLength: 254
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      required: false,
      values: Object.values(AnimalStatus),
      default: AnimalStatus.AVAILABLE,
    }
  ]
};