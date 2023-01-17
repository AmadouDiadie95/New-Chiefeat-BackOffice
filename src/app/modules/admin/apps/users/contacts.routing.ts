import { Route } from '@angular/router';
import { ContactsComponent } from 'app/modules/admin/apps/users/contacts.component';
import { ContactsListComponent } from 'app/modules/admin/apps/users/list/list.component';
import { ContactsDetailsComponent } from 'app/modules/admin/apps/users/details/details.component';

export const contactsRoutes: Route[] = [
    {
        path     : '',
        component: ContactsComponent,
        children : [
            {
                path     : '',
                component: ContactsListComponent,
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent
                    }
                ]
            }
        ]
    }
];
