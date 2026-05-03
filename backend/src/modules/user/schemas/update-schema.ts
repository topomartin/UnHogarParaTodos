import { AnimalRequestStatus, AnimalRequestType, UserRole } from "src/common/knowledge/enums";

export const UserUpdateSchema = {
    fields: [
        {
            key: 'id',
            label: 'Id',
            type: 'number',
            required: false,
            readonly: true,
        },
        {
            key: 'username',
            label: 'Nombre',
            type: 'text',
            required: false,
            readonly: true
        },
        {
            key: 'email',
            label: 'email',
            type: 'text',
            required: false,
            readonly: true
        },
        {
            key: 'role',
            label: 'Tipo',
            type: 'select',
            required: true,
            values: Object.values(UserRole)
        }
    ]
};