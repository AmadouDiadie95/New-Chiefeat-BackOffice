import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FuseNavigationModule } from '@fuse/components/navigation/navigation.module';
import {DemoSidebarComponent} from "./demo-sidebar.component";
import {SharedModule} from "../../../../../shared/shared.module";

@NgModule({
    declarations: [
        DemoSidebarComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild([]),
        MatIconModule,
        MatProgressBarModule,
        FuseNavigationModule
    ],
    exports     : [
        DemoSidebarComponent
    ]
})
export class DemoSidebarModule
{
}
