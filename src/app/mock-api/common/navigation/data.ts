/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'dashboard',
        title: 'Tableau de Bord',
        type : 'basic',
        icon : 'heroicons_outline:home',
        link : '/dashboard'
    },

    {
        id      : 'recettes',
        title   : 'Recettes',
        tooltip : 'Recettes',
        type    : 'basic',
        icon    : 'heroicons_outline:sparkles',
        link    : '/apps/menus-list'
    },
    {
        id   : 'user-management',
        title: 'Utilisateurs',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/apps/users'
    },
    {
        id      : 'faqs',
        title   : 'FAQs',
        tooltip : 'FAQs',
        type    : 'basic',
        icon    : 'heroicons_outline:qrcode',
        link    : '/apps/help-center'
    },
    {
        id      : 'rapports',
        title   : 'Signalements',
        tooltip : 'Signalements',
        type    : 'basic',
        icon    : 'heroicons_outline:cloud',
        link    : '/apps/rapports'
    },
    {
        id   : 'setting',
        title: 'Settings',
        type : 'basic',
        icon : 'heroicons_outline:cog',
        link : '/settings'
    }
];
