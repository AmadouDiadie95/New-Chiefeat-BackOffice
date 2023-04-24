import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";

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

    columnsInactifsChiefs: string[] = ['Nom', 'Prenom','Email','Teléphone',"Adhésion", "Suspension", "Motifs", 'Options'];
    listInactifsChiefs: any[] = [
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', dateOfSuspend:'14/01/2023',suspendCause: 'Infogreffe' , options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', dateOfSuspend:'14/01/2023',suspendCause: 'Administratif' , options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', dateOfSuspend:'14/01/2023',suspendCause: 'Doublon' , options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', dateOfSuspend:'14/01/2023',suspendCause: 'Avertissements' , options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', dateOfSuspend:'14/01/2023',suspendCause: 'Moyenne' , options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', dateOfSuspend:'14/01/2023',suspendCause: 'Comportement' , options: 'Details'},
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
