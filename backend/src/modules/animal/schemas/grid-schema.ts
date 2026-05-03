import { AnimalRequestStatus, AnimalRequestType } from "src/common/knowledge/enums";

export const AnimalGridSchema = {
    displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nombre' },
        { key: 'type', label: 'Tipo' },
        { key: 'status', label: 'Estado' },
        { key: 'birth_date', label: 'Nacimiento' },
    ]
};