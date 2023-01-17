import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {EventModel} from "../../../../../models/entities/event.model";
import {map} from "rxjs/operators";
import {IResponse} from "../../../../../models/base/IResponse";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {CategoryModel} from "../../../../../models/entities/category.model";
import {OrganizerModel} from "../../../../../models/entities/organizer.model";

@Component({
    selector     : 'demo-sidebar',
    templateUrl     : './demo-sidebar.component.html',
    styles       : [
        `
            demo-sidebar fuse-vertical-navigation .fuse-vertical-navigation-wrapper {
                box-shadow: none !important;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class DemoSidebarComponent implements OnInit
{
    menuData: FuseNavigationItem[];
    menuDataAction: FuseNavigationItem[] = [] ;
    menuDataOtherEvents: FuseNavigationItem[] = [] ;
    dataObtained : boolean = false ;
    event: EventModel = new EventModel() ;
    eventId : number ;
    allCategories: CategoryModel[] = [] ;
    isDataLoadedOne: boolean = false ;
    allOrganizers: OrganizerModel[] = [] ;
    currentCategory: CategoryModel = null ;

    /**
     * Constructor
     */
    constructor(private dataSubjectService: DataSubjectService,
                // private store: Store,
                private restAPIService: RestAPIService)
    {
    }

    ngOnInit(): void {
        this.loadDataFromStore() ;
        this.dataSubjectService.event$.subscribe(value => {
            console.log(value) ;
            if (value) {
                this.dataObtained = true ;
                this.event = value;
                this.eventId = this.event.id ;
                this.menuDataAction = [
                    {
                        title: 'Detail',
                        type : 'basic',
                        icon : 'heroicons_outline:clipboard-list',
                        link : 'detail/'+this.eventId
                    },
                    {
                        title: 'Modifier',
                        type : 'basic',
                        icon : 'heroicons_outline:pencil',
                        link : 'edit/'+this.eventId
                    },
                    {
                        title: 'Supprimer',
                        type : 'basic',
                        icon : 'heroicons_outline:trash',
                        link : 'delete/'+this.eventId
                    }
                ]
            }
            this.initMenuData() ;
        }) ;
    }

    initMenuData() {
        this.menuData = [
            {
                title   : 'Actions',
                subtitle: 'Detail, Ajouter, Modifier & Supprimer',
                type    : 'group',
                children: [
                    {
                        title: 'Ajouter',
                        type : 'basic',
                        icon : 'heroicons_outline:plus-circle',
                        link : 'add'
                    }
                ]
            },
            {
                title   : 'Evénements',
                type    : 'group',
                children: []
            },
            {
                type: 'divider'
            }
        ];
            this.menuDataAction.forEach(item => {
                this.menuData[0].children.push(item)
            });

        if (this.event) {
            this.allCategories.forEach(cat => {
                if (cat.id === this.event.category.id) {
                    this.currentCategory = cat;
                }
            });
        }
            // console.log(this.currentCategory) ;

            if (this.currentCategory) {
                this.currentCategory.eventList.slice(this.currentCategory.eventList.length - 5).forEach(event => {
                    this.menuData[1].children.unshift(
                        {
                            title: event.title ,
                            type : 'basic',
                            icon : 'heroicons_outline:sparkles',
                            link : 'detail/' + event.id ,
                            // function:()=>{this.dataSubjectService.dispatchEvent(event)}
                        }
                    )
                }) ;
            }
    }

    private loadDataFromStore() {
        /*this.store.pipe(
            map( (state:any) => state.GlobalState)).subscribe((globalState:GlobalState) => {
            if (globalState.allCategories.length > 0) {
                this.allCategories = globalState.allCategories;
                // console.log(this.allCategories)
            } else {
                if (!this.isDataLoadedOne) {
                    console.log("Store Empty") ;
                    this.isDataLoadedOne = true ;
                    this.loadDataFromDB();
                }
            }
        }) ;*/
    }

    loadDataFromDB() {
        this.getAllCategories() ;
    }

    getAllCategories() {
        // console.log("get all Categories") ;
        /*this.restAPIService.findAll('api/categories').subscribe((response:IResponse)=>{
             // console.log(response) ;
            if (response.ok) {
                this.store.dispatch({type: GlobalStateActionsTypesEnum.SET_ALL_CATEGORIES, payload:response.data}) ;
            }
        },error => {
            console.log(error) ;
        }) ;*/

    }

    show($event: any) {
        console.log('---------------------------------') ;
        console.log($event) ;
    }
}
