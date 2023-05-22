import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";
import {User} from "../../../../../models/chiefeat/users";

@Component({
  selector: 'app-list-inactifs-chiefs',
  templateUrl: './list-inactifs-chiefs.component.html',
  styleUrls: ['./list-inactifs-chiefs.component.scss']
})
export class ListInactifsChiefsComponent implements OnInit {

    userLogged: UserModel = this.authService.getUserLogged() ;


    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;

    columnsInactifsChiefs: string[] = ['Nom', 'Prenom','Email','Teléphone',"Adhésion", /*"Suspension", "Motifs",*/ 'Options'];
    @Input()
    listInactifsChiefs: User[] = [] ;
    listToShow: User[] = [] ;

    searchKey: string = '' ;

    /**
     * Constructor
     */
    constructor(
        private authService:AuthService,
        private _projectService: ProjectService,
        private _router: Router
    )
    {
    }

    ngOnInit(): void {
        this.listToShow = this.listInactifsChiefs ;
    }

    trackByFn(index: number, item: any): any
    {
        return item?.id || index;
    }

    getPaging(event) {
        console.log(event) ;
        // this.findEventTicketsByPage(event.pageIndex, event.pageSize);
    }

    searchClick() {
        this.searchKey = this.searchKey.trim() ;
        this.listToShow = this.listInactifsChiefs
            .filter(elt => elt.firstname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.lastname?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.email?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.phoneNumber?.toLowerCase().includes(this.searchKey.toLowerCase())
                )
    }

}
