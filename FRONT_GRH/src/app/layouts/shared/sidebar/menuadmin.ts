import { MenuItem } from './menu.model';

export const MENUADMIN: MenuItem[] = [
    {
        id: 1,
        label: 'MENU',
        isTitle: true
    },
   /* {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'ri-dashboard-line',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        link: '/administrateur'
    },*/
    {
        id: 3,
        label: 'Société',
        icon: 'ri-bank-line',
        link: '/administrateur/societe/list'
    },
    {
        id: 4,
        label: 'AGENTS',
        icon: 'ri-file-user-line',
        link: '/administrateur/users'
    }
];
