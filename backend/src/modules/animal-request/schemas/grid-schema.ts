import { AnimalRequestStatus, AnimalRequestType } from "src/common/knowledge/enums";

export const AnimalRequestGridchema = {
    displayedColumns: [
        { key: 'id', label: 'ID' },
        { key: 'animal.name', label: 'animal', type: 'option', options:{showColumn: true, icon: 'visibility', customAction: 'info'}},
        { key: 'user.username', label: 'usuario',type: 'option', options:{showColumn: true, icon: 'visibility', customAction: 'info'} },
        { key: 'type', label: 'tipo' },
        { key: 'status', label: 'status'},
    ]
};  