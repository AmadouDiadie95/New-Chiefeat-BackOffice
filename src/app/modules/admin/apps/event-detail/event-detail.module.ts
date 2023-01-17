import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventDetailComponent} from "./event-detail.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {Route, RouterModule} from "@angular/router";
import {DemoSidebarModule} from "./demo-sidebar/demo-sidebar.module";
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { DeleteComponent } from './delete/delete.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {SharedModule} from "../../../../shared/shared.module";
import {FuseAlertModule} from "../../../../../@fuse/components/alert";

export const routes: Route[] = [
    {
        path     : '',
        component: EventDetailComponent,
        children: [
            {path     : 'add', component: AddComponent},
            {path     : 'detail/:id', component: DetailComponent},
            {path     : 'edit/:id', component: EditComponent},
            {path     : 'delete/:id', component: DeleteComponent},
        ]
    }
];

@NgModule({
  declarations: [
      EventDetailComponent,
      AddComponent,
      EditComponent,
      DetailComponent,
      DeleteComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatSidenavModule,
        MatIconModule,
        RouterModule,
        DemoSidebarModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDividerModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule.setLocale('fr-EU'),
        SharedModule,
        FuseAlertModule
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class EventDetailModule { }
