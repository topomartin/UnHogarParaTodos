import { AnimalStatus, AnimalType } from "src/common/knowledge/enums";

export const AnimalInfoSchema = {
  fields: [
    {
      key: 'name',
      label: 'Nombre',
      type: 'text',
      required: true,
      readonly: true,
      maxLength: 50
    },
    {
      key: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      readonly: true,
      values: Object.values(AnimalType)
    },
    {
      key: 'birth_date',
      label: 'Fecha de nacimiento',
      type: 'date',
      required: true,
      readonly: true,
    },
    {
      key: 'description',
      label: 'Descripción',
      type: 'text',
      required: false,
      readonly: true,
      maxLength: 254
    },
    {
      key: 'status',
      label: 'Estado',
      type: 'select',
      required: false,
      readonly: true,
      values: Object.values(AnimalStatus),
      default: AnimalStatus.AVAILABLE,
    }
  ]
};