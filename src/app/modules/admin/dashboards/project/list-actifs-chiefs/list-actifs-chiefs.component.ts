import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";
import {User} from "../../../../../models/chiefeat/users";
import {RestAPIService} from "../../../../../services/rest-api.service";

@Component({
  selector: 'app-list-actifs-chiefs',
  templateUrl: './list-actifs-chiefs.component.html',
  styleUrls: ['./list-actifs-chiefs.component.scss']
})
export class ListActifsChiefsComponent implements OnInit {
    userLogged: UserModel = this.authService.getUserLogged() ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;

    columnsActifsChiefs: string[] = ['Nom', 'Prenom','Email','Teléphone',/*'Avertissements',*/ "Adhésion",/* 'Resas en cours', 'Resas terminées', 'Annulations',*/'Moyenne', 'Options'];
    @Input()
    listActifsChiefs: User[] = [] ;
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
    )
    {
    }

    ngOnInit(): void {
        this.listToShow = this.listActifsChiefs ;
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
        this.listToShow = this.listActifsChiefs
            .filter(elt => elt.firstname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.lastname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.email?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.phoneNumber?.toLowerCase().includes(this.searchKey.toLowerCase())
            )
    }

    disableClicked(item:User) {
        console.log(item) ;
        item.enable = false ;
        this.restAPIService.put("profiles/desactivate-account", item.id, {enable: false}).subscribe(
            (data: any) => {
                console.log(data);
                this.listToShow = this.listToShow.filter(elt => elt.id !== item.id) ;
                this.listActifsChiefs = this.listActifsChiefs.filter(elt => elt.id !== item.id) ;
            } ,
            (error: any) => {
                console.log(error);
            } ) ;
    }
}
