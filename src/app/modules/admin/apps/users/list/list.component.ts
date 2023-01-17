import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {MatDrawer} from '@angular/material/sidenav';
import {catchError, map, Observable, of, startWith, Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {UserModel} from "../../../../../models/auth/user.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {AppDataState, DataStateEnum} from "../../../../../state/state";
import {IResponse} from "../../../../../models/base/IResponse";

@Component({
    selector       : 'contacts-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    users$: Observable<AppDataState<any>> | null = null ;
    initialUsersList: UserModel[] = [] ;
    usersList: UserModel[] = [] ;
    DataStateEnum = DataStateEnum ;

    usersCount: number = 0;
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl();
    selectedUser: UserModel;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userLogged: UserModel = JSON.parse( localStorage.getItem('userLogged') ) ;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private dataSubjectService: DataSubjectService,
        private restAPIService: RestAPIService,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    )
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
        this.users$ = this.restAPIService.findAll('users').pipe(
            map((data:IResponse)=>{
                if (data.ok) {
                    // console.log(data) ;
                    // Update the counts
                    this.usersCount = data.data.length;
                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                    this.usersList = data.data ;
                    this.initialUsersList = data.data ;
                    return ({dataState: DataStateEnum.LOADED, data: data.data})
                } else {
                    return ({dataState: DataStateEnum.ERROR, errorMessage:data.message})
                }
            }),
            startWith({dataState:DataStateEnum.LOADING}),
            catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
        ) ;



        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges.subscribe( searchKey => {
            if (searchKey) {
                this.usersList = this.initialUsersList.filter(user => user.fullName.toLowerCase().includes(searchKey.toLowerCase()));
            } else {
                this.usersList = this.initialUsersList ;
            }
        });

        // Subscribe to MatDrawer opened change
        this.matDrawer.openedChange.subscribe((opened) => {
            if ( !opened )
            {
                // Remove the selected contact when drawer closed
                this.selectedUser = null;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                }
                else
                {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
                this.matDrawer.close();
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

    // -----------------------------------------------------------------------------------------------------
    // @ User Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create user
     */
    createUser(): void
    {
        // Create the contact
        this.dataSubjectService.dispatchData('user',new UserModel()) ;
        // Go to the new user
        this._router.navigate(['./',"-1"], {relativeTo: this._activatedRoute});
    }

    selectUser(user:UserModel) {
        // Create the contact
        this.dataSubjectService.dispatchData('user',user) ;
        // Go to the new user
        this._router.navigate(['./',user.id], {relativeTo: this._activatedRoute});
    }


    /****************************************************************************/

    // -----------------------------------------------------------------------------------------------------
    // @ Contacts Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    /****************************************************************************/

}
