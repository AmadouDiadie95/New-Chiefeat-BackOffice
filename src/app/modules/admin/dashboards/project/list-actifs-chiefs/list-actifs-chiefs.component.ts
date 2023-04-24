import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";

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

    columnsActifsChiefs: string[] = ['Nom', 'Prenom','Email','Teléphone',"Adhésion", 'N°SIREN', 'Avertissements', 'Annulations','Taux de reussite','Moyenne', 'Statut', 'Options'];
    listActifsChiefs: any[] = [
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', siren:'0146548545854555', warning:3, cancels:5, successPourcent:45, moyenne:76, statut:'verified', options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', siren:'0146548545854555', warning:3, cancels:5, successPourcent:45, moyenne:76, statut:'running', options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', siren:'0146548545854555', warning:3, cancels:5, successPourcent:45, moyenne:76, statut:'refused', options: 'Details'},
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
