import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-new-chiefs',
  templateUrl: './list-new-chiefs.component.html',
  styleUrls: ['./list-new-chiefs.component.scss']
})
export class ListNewChiefsComponent implements OnInit {
    userLogged: UserModel = this.authService.getUserLogged() ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;
    columnsNewChiefs: string[] = ['Nom', 'Prenom','Email','Teléphone',"Adhesion", 'N°SIREN', 'Alerte', 'Options'];
    listNewChiefs: any[] = [
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', siren:'0146548545854555', alert:false, options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', siren:'0012547845454545', alert:false, options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', siren:'7868464656546546', alert:true, options: 'Details'},
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
