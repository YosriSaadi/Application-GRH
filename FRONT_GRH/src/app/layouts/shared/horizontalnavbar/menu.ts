import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENU',
        isTitle: true
    },
    {
        id: 2,
        label: 'Tableau bord',
        icon: ' fas fa-chart-line',
        badge: {
            variant: 'success',
            text: '8',
        },
        link: '/'
    },
    {
        id: 72,
        label: 'Fiche Signalitique',
        icon: 'ri-home-smile-2-line',
        link: '/Fiche',
        parentId: 63
    },
    {
        id: 3,
        label: 'Planinng',
        icon: 'far fa-calendar-alt',
        link: '/calendrier'
    },
    {
        id: 3,
        label: 'Gestion mois et clôtures',
        icon: 'fas fa-key',
        link: '/ordres'
    },
    {
        id: 3,
        label: 'Configuration',
        icon: 'far fa-sun',
        link: '/parametrage'
    },
    {
        id: 7,
        label: 'Législation Du Travail',
        icon: 'fas fa-balance-scale',
        subItems: [
           
            {
                id: 9,
                label: 'Régimes',
                link: '/legislation/regimes',
                parentId: 73
            },
            {
                id: 10,
                label: 'Shifts',
                link: '/legislation/shifts',
                parentId: 73
            },
            {
                id: 11,
                label: 'IRPP',
                link: '/legislation/irpp',
                parentId: 73
            },
        
        ]
    },



    {
        id: 12,
        label: 'Dossier employé',
        icon: 'fas fa-address-card',
        link: '/dossier_employes'
    },
    {
        id: 13,
        label: 'Paie',
        isTitle: true
    },
    {
        id: 14,
        label: 'Les élement de paie',
        icon: 'ri-briefcase-4-line',
        subItems: [
            {
                id: 15,
                label: 'Prêt',
                link: '/prets',
                parentId: 15
            },
            {
                id: 16,
                label: 'Prime',
                link: '/prime',
                parentId: 16
            },
            {
                id: 17,
                label: 'Avance',
                link: '/avance',
                parentId: 17
            },
            {
                id: 11,
                label: 'Retenue',
                link: '/retenue',
                parentId: 73
            },
            {
                id: 11,
                label: 'Absence',
                link: '/absence',
                parentId: 73
            },
            {
                id: 12,
                label: 'Congé',
                link: '/conges',
                parentId: 73
            },
            {
                id: 13,
                label: 'Heures supplémentaires',
                link: '/hs',
                parentId: 13
            },
        
        ]
    },
    {
        id: 14,
        label: 'Géneration de la paie',
        icon: 'fas fa-file-invoice-dollar',
        link: '/paie'
    }
 
];

