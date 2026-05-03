import { AnimalRequestStatus, AnimalRequestType } from "src/common/knowledge/enums";

export const AnimalRequestGridchema = {
    displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'animal.name', label: 'Animal'  },
        { key: 'user.username', label: 'usuario' },
        { key: 'type', label: 'tipo' },
        { key: 'status', label: 'status'},
    ]
};