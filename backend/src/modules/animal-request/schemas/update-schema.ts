import { AnimalRequestStatus, AnimalRequestType } from "src/common/knowledge/enums";

export const AnimalRequestUpdateSchema = {
    fields: [
        {
            key: 'userId',
            label: 'Usuario',
            type: 'text',
            required: true,
            readonly: true,
            joinValue: 'user.id',
            joinLabel: 'user.username'
        },
        {
            key: 'animalId',
            label: 'Animal',
            type: 'text',
            readonly: true,
            required: true,
            joinValue: 'animal.id',
            joinLabel: 'animal.name'
        },
        {
            key: 'type',
            label: 'Tipo de solicitud',
            type: 'select',
            readonly: true,
            required: true,
            disabled: true,
            values: Object.values(AnimalRequestType)
        },
        {
            key: 'status',
            label: 'Estado',
            type: 'select',
            required: false,
            values: Object.values(AnimalRequestStatus),
            default: 'PENDING'
        }
    ]
};