import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";
import {User} from "../../../../../models/chiefeat/users";
import {RestAPIService} from "../../../../../services/rest-api.service";

@Component({
  selector: 'app-list-inactifs-eaters',
  templateUrl: './list-inactifs-eaters.component.html',
  styleUrls: ['./list-inactifs-eaters.component.scss']
})
export class ListInactifsEatersComponent implements OnInit {
    userLogged: UserModel = this.authService.getUserLogged() ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;

    columnsInactifsChiefs: string[] = ['Nom', 'Prenom','Email','Teléphone',"Adhésion", /*"Suspension", "Motifs",*/ 'Options'];
    @Input()
    listInactifsEaters: User[] = [] ;
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
        this.listToShow = this.listInactifsEaters ;
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
        this.listToShow = this.listInactifsEaters
            .filter(elt => elt.firstname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.lastname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.email?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.phoneNumber?.toLowerCase().includes(this.searchKey.toLowerCase())
            )
    }

    enableClicked(item:User) {
        console.log(item) ;
        item.enable = true ;
        this.restAPIService.put("users", item.id, item).subscribe(
            (data: any) => {
                this.listToShow = this.listToShow.filter(elt => elt.id !== item.id) ;
                this.listInactifsEaters = this.listInactifsEaters.filter(elt => elt.id !== item.id) ;
            } ,
            (error: any) => {
                console.log(error);
            } ) ;
    }

}
