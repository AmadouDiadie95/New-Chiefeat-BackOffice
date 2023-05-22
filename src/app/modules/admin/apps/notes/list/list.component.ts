import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, Observable, Subject, takeUntil} from 'rxjs';
import {FuseMediaWatcherService} from '@fuse/services/media-watcher';
import {NotesService} from 'app/modules/admin/apps/notes/notes.service';
import {Label, Note} from 'app/modules/admin/apps/notes/notes.types';
import {FuseAlertService} from "../../../../../../@fuse/components/alert";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {UserModel} from "../../../../../models/auth/user.model";
import {CategoryModel} from "../../../../../models/entities/category.model";
import {EventModel} from "../../../../../models/entities/event.model";
import {IResponse} from "../../../../../models/base/IResponse";
import {DatePipe} from "@angular/common";
import {NotesDetailsComponent} from "../details/details.component";
import {HttpClient} from "@angular/common/http";
import {cloneDeep} from "lodash-es";
import {MenuDetailsComponent} from "../details-menu/details.component";

@Component({
    selector       : 'notes-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesListComponent implements OnInit, OnDestroy
{
    labels$: Observable<Label[]>;
    notes$: Observable<Note[]>;

    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    filter$: BehaviorSubject<string> = new BehaviorSubject('notes');
    searchQuery$: BehaviorSubject<string> = new BehaviorSubject(null);
    masonryColumns: number = 4;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    userLogged: UserModel = JSON.parse(localStorage.getItem('userLogged')) ;
    currentCategory: CategoryModel = new CategoryModel() ;
    initialEventList: EventModel[] = [] ;
    allCategories: CategoryModel[] = [] ;
    isDataLoadedOne: boolean = false ;
    todayDate: string = this.datePipe.transform(new Date(), 'yyyy/MM/dd') ;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _matDialog: MatDialog,
        private _notesService: NotesService,
        private _fuseAlertService: FuseAlertService,
        public restAPIService: RestAPIService,
        private route: ActivatedRoute,
        private dataSubjectService: DataSubjectService,
        private datePipe: DatePipe,
        private router: Router,
        private httpClient : HttpClient
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the filter status
     */
    get filterStatus(): string
    {
        return this.filter$.value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loadDataFromDB() ;
        // Request the data from the server

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened if the given breakpoint is active
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

                // Set the masonry columns
                //
                // This if block structured in a way so that only the
                // biggest matching alias will be used to set the column
                // count.
                if ( matchingAliases.includes('xl') )
                {
                    this.masonryColumns = 5;
                }
                else if ( matchingAliases.includes('lg') )
                {
                    this.masonryColumns = 4;
                }
                else if ( matchingAliases.includes('md') )
                {
                    this.masonryColumns = 3;
                }
                else if ( matchingAliases.includes('sm') )
                {
                    this.masonryColumns = 2;
                }
                else
                {
                    this.masonryColumns = 1;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this.searchQuery$.subscribe(searchKey => {
            // console.log(searchKey)
            if (searchKey) {
                this.currentCategory.eventList = this.initialEventList.filter(
                       x => x.title.toLowerCase().includes(searchKey.toLowerCase()) ||
                                x.description.toLowerCase().includes(searchKey.toLowerCase()) );
            } else {
                this.currentCategory.eventList = this.initialEventList ;
            }
        }) ;
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    /**
     * Filter by query
     *
     * @param query
     */
    filterByQuery(query: string): void
    {
        this.searchQuery$.next(query);
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

   /* private loadDataFromStore() {
        this.store.pipe(
            map( (state:any) => state.GlobalState)).subscribe((globalState:GlobalState) => {
            if (globalState.allCategories.length > 0) {
                this.allCategories = globalState.allCategories;
                this.changeCat(this.allCategories[0]) ;
            }
        }) ;
    }*/

    loadDataFromDB() {
        this.getAllCategories() ;
    }

    getAllCategories() {
        // console.log("get all Categories") ;
        this.restAPIService.findAll('menus/search/').subscribe((response:IResponse)=>{
            console.log(response) ;
            if (response.ok) {
                // this.allCategories = response.data ;
                // this.changeCat(this.allCategories[0]) ;
            }
        },error => {
            console.log(error) ;
        }) ;

        this.httpClient.get('assets/chiefeat/allCategories.json').subscribe((response:any)=>{
            // console.log(response) ;
            if (response) {
                this.allCategories = response ;
                this.changeCat(this.allCategories[0]) ;
            }
            // this.loadDataFromStore() ;
        },error => {
            console.log(error) ;
            // this.loadDataFromStore() ;
        }) ;

    }

    exportData = (data) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "institutionExample.json";

    link.click();
    };



    showAlert(name: string): void {
        this._fuseAlertService.show(name);
    }

    checkIfCurrentCat(subCategoryId: number): string {
        if (subCategoryId === this.currentCategory.id) {
            return 'bg-gray-200 dark:bg-gray-700 text-primary dark:text-primary-400'
        } else {
            return '';
        }
    }

    reloadCurrentPage(url: string) {
        this.router.navigate([url])
            .then(() => {
                window.location.reload();
            });
        // window.location.reload();
        // this.router.navigate([this.router.url])
    }

    resizeTextLength(text: string, maxLength: number): string {
        let result = '';
        if (text.length > maxLength) {
            result = text.substring(0, maxLength)
            result += "...";
        } else {
            result = text;
        }
        return result;
    }

    changeCat(category: CategoryModel) {
        this.currentCategory = {...category} ;
        this.initialEventList = this.currentCategory.eventList ;
        this._changeDetectorRef.markForCheck() ;
        // this.getVideosPageable(this.currentSubCategory.id, this.page, this.size) ;
    }

    /*getPaginationActiveStyle(p: number):string {
        let style = "cursor:pointer;color: black;float: left;padding: 8px 16px;text-decoration: none;" ;
        return p !== this.currentPage ? style : style + "background-color: orange;color: black;border-radius: 5px;" ;
    }*/

    addNewEntity(entityType: string, data?: any) {
        if (entityType === 'Event') {
            this.router.navigateByUrl('apps/event-detail/add') ;
        } else if (entityType === 'Category') {
            this._matDialog.open(NotesDetailsComponent, {
                autoFocus: false,
                data     : {
                }
            });
        }
    }

    editCat(category: CategoryModel) {
        console.log(category) ;
        this._matDialog.open(NotesDetailsComponent, {
            autoFocus: false,
            data : category
        });
    }

    eventClicked(event: EventModel) {
        // console.log(event) ;
        // this.dataSubjectService.dispatchEvent(event) ;
        // this.router.navigateByUrl('dashboard/finance/' + event.id);
        // this.router.navigateByUrl('apps/event-detail/detail/' + event.id) ;
        /*if (event.dateReversed >= this.todayDate ) {
            this.router.navigateByUrl('apps/event-detail/detail/' + event.id);
        } else {
            this.router.navigateByUrl('dashboard/finance/' + event.id);
        }*/
        this._matDialog.open(MenuDetailsComponent, {
            autoFocus: false,
            data     : cloneDeep(event)
        });
    }
}
