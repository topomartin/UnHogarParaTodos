import { SponsorshipFrequency } from "src/common/knowledge/enums";

export const SponsorshipCreateSchema = {
  fields: [
    {
      key: 'userId',
      label: 'Usuario',
      type: 'select',
      required: true,
      optionsEndpoint: '/users',
      labelField: 'username',
      valueField: 'id'
    },
    {
      key: 'animalId',
      label: 'Animal',
      type: 'select',
      required: true,
      optionsEndpoint: '/animals',
      labelField: 'name',
      valueField: 'id'
    },
    {
      key: 'amount',
      label: 'Cantidad',
      type: 'number',
      required: true,
      min: 0.01,
      step: 0.01
    },
    {
      key: 'frequency',
      label: 'Frecuencia',
      type: 'enum',
      required: false,
      values: Object.values(SponsorshipFrequency),
      default: SponsorshipFrequency.MONTHLY
    },
    {
      key: 'startDate',
      label: 'Fecha de inicio',
      type: 'datetime',
      required: true
    }
  ]
};