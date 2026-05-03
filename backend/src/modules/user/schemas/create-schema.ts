import { AnimalRequestStatus, AnimalRequestType } from "src/common/knowledge/enums";

export const AnimalRequestCreateSchema = {
    fields: [
        {
            key: 'userId',
            label: 'Usuario',
            type: 'select',
            required: true,
            optionsEndpoint: '/users'
        },
        {
            key: 'animalId',
            label: 'Animal',
            type: 'select',
            required: true,
            optionsEndpoint: '/animals'
        },
        {
            key: 'type',
            label: 'Tipo de solicitud',
            type: 'enum',
            required: true,
            values: Object.values(AnimalRequestType)
        },
        {
            key: 'status',
            label: 'Estado',
            type: 'enum',
            required: false,
            values: Object.values(AnimalRequestStatus),
            default: 'PENDING'
        }
    ]
};