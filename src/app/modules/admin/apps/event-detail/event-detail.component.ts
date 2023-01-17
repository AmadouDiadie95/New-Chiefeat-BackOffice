import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {DataSubjectService} from "../../../../services/data-subject.service";
import {EventModel} from "../../../../models/entities/event.model";

@Component({
    selector     : 'simple-left-sidebar-2-content-scroll',
    templateUrl  : './event-detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class EventDetailComponent implements OnInit, OnDestroy
{
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    title: string = 'Menu Evenémentiel' ;

    /**
     * Constructor
     */
    constructor(private dataSubjectService: DataSubjectService,
        private _fuseMediaWatcherService: FuseMediaWatcherService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSubjectService.event$.subscribe((value:EventModel) => {
            console.log(value) ;
            if (value) {
                this.title = value.title ;
            } else {
                this.title = 'Menu Evenémentiel' ;
            }
        }) ;

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
