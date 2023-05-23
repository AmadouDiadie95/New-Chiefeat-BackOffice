import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";
import {User} from "../../../../../models/chiefeat/users";
import {RestAPIService} from "../../../../../services/rest-api.service";

@Component({
  selector: 'app-list-actifs-eaters',
  templateUrl: './list-actifs-eaters.component.html',
  styleUrls: ['./list-actifs-eaters.component.scss']
})
export class ListActifsEatersComponent implements OnInit {
    userLogged: UserModel = this.authService.getUserLogged() ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;

    columnsActifsEaters: string[] = ['Nom', 'Prenom','Email','Teléphone',/*'Avertissements',*/ "Adhésion",/* 'Resas en cours', 'Resas terminées', 'Annulations',*/'Moyenne', 'Options'];
    @Input()
    listActifsEaters: User[] = [] ;
    listToShow: User[] = [] ;
    searchKey: string = '' ;

    /**
     * Constructor
     */
    constructor(
        private authService:AuthService,
        private _projectService: ProjectService,
        private _router: Router,
        public restAPIService:RestAPIService,
    ) {}

    ngOnInit(): void {
        this.listToShow = this.listActifsEaters ;
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getPaging(event) {
        console.log(event) ;
        // this.findEventTicketsByPage(event.pageIndex, event.pageSize);
    }

    searchClick() {
        this.searchKey = this.searchKey.trim() ;
        this.listToShow = this.listActifsEaters
            .filter(elt => elt.firstname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.lastname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.email?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.phoneNumber?.toLowerCase().includes(this.searchKey.toLowerCase())
            )
    }

    disableClicked(item:User) {
        console.log(item) ;
        item.enable = false ;
        this.restAPIService.put("users", item.id, item).subscribe(
            (data: any) => {
                this.listToShow = this.listToShow.filter(elt => elt.id !== item.id) ;
                this.listActifsEaters = this.listActifsEaters.filter(elt => elt.id !== item.id) ;
            } ,
            (error: any) => {
                console.log(error);
            } ) ;
    }

}
