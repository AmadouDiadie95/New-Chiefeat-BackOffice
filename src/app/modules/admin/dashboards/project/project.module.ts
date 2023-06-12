import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectComponent } from 'app/modules/admin/dashboards/project/project.component';
import { projectRoutes } from 'app/modules/admin/dashboards/project/project.routing';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import { ListNewChiefsComponent } from './list-new-chiefs/list-new-chiefs.component';
import { ListActifsChiefsComponent } from './list-actifs-chiefs/list-actifs-chiefs.component';
import { ListInactifsChiefsComponent } from './list-inactifs-chiefs/list-inactifs-chiefs.component';
import { ListNewEatersComponent } from './list-new-eaters/list-new-eaters.component';
import { ListActifsEatersComponent } from './list-actifs-eaters/list-actifs-eaters.component';
import { ListInactifsEatersComponent } from './list-inactifs-eaters/list-inactifs-eaters.component';
import { ListReservationsFutursComponent } from './list-reservations-futurs/list-reservations-futurs.component';
import { ListReservationsFinishedComponent } from './list-reservations-finished/list-reservations-finished.component';
import { ListReservationsCanceledsComponent } from './list-reservations-canceleds/list-reservations-canceleds.component';
import {UserDetailsComponent} from "../details-user/details.component";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        ProjectComponent,
        ListNewChiefsComponent,
        ListActifsChiefsComponent,
        ListInactifsChiefsComponent,
        ListNewEatersComponent,
        ListActifsEatersComponent,
        ListInactifsEatersComponent,
        ListReservationsFutursComponent,
        ListReservationsFinishedComponent,
        ListReservationsCanceledsComponent,
        UserDetailsComponent
    ],
    imports: [
        RouterModule.forChild(projectRoutes),
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class ProjectModule
{
}
