import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";

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

    columnsActifsEaters: string[] = ['Nom', 'Prenom','Email','Teléphone','Avertissements', "Adhésion", 'Resas en cours', 'Resas terminées', 'Annulations','Moyenne', 'Options'];
    listActifsEaters: any[] = [
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00',  warning:3,  date:'31/12/2022',resasRunning:5, resasfinised:7, cancels:5, moyenne:76,options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00',  warning:3,  date:'31/12/2022',resasRunning:5, resasfinised:7, cancels:5, moyenne:0,options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00',  warning:3,  date:'31/12/2022',resasRunning:5, resasfinised:7, cancels:5, moyenne:64,options: 'Details'},
    ] ;

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
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getPaging(event) {
        console.log(event) ;
        // this.findEventTicketsByPage(event.pageIndex, event.pageSize);
    }

}
