import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../../models/auth/user.model";
import {AuthService} from "../../../../../services/auth.service";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-new-eaters',
  templateUrl: './list-new-eaters.component.html',
  styleUrls: ['./list-new-eaters.component.scss']
})
export class ListNewEatersComponent implements OnInit {
    userLogged: UserModel = this.authService.getUserLogged() ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;
    columnsNewEaters : string[] = ['Nom', 'Prenom','Email','Teléphone',"Adhesion", 'Alerte', 'Options'];
    listNewEaters : any[] = [
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', alert:false, options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', alert:false, options: 'Details'},
        {lastName: 'Doe',firstName: 'John', email: 'john@gmail.com', phone: '+33 487 14 11 00', date:'31/12/2022', alert:true, options: 'Details'},
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
