
export const AdminPageGridSchema = {
    displayedTabs: [
        {
            modelName: 'user',
            canCreate: false,
            canUpdate: true
        },
        {
            modelName: 'animal',
            canCreate: true,
            canUpdate: false
        },
        {
            modelName: 'animal-requests',
            canCreate: false,
            canUpdate: true
        },
        {
            modelName: 'sponsorship',
            canCreate: false,
            canUpdate: false
        },
        {
            modelName: 'questions',
            canCreate: true,
            canUpdate: true
        },
        {
            modelName: 'answers',
            canCreate: true,
            canUpdate: true
        }
    ]
};