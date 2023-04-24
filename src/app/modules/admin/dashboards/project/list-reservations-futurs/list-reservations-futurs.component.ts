import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-reservations-futurs',
  templateUrl: './list-reservations-futurs.component.html',
  styleUrls: ['./list-reservations-futurs.component.scss']
})
export class ListReservationsFutursComponent implements OnInit {

    @Input()
    bookingComing: any[] = [] ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;

    columnsResasFuturs: string[] = ['Num de Réservation','Date de réservation','Date de préstation','Heure de préstation','Eater',"Chief", "Details"];
    listResasFuturs: any[] = [
        {numResas: '4466745645', dateResas: '01-01-2023', datePrestat: '04-01-2023', hourPrestat: '11h30', eater: 'Hugo LEVOIR', chief:'john Doe', options: 'Details'},
        {numResas: '4466745645', dateResas: '01-01-2023', datePrestat: '04-01-2023', hourPrestat: '11h30', eater: 'Hugo LEVOIR', chief:'john Doe', options: 'Details'},
        {numResas: '4466745645', dateResas: '01-01-2023', datePrestat: '04-01-2023', hourPrestat: '11h30', eater: 'Hugo LEVOIR', chief:'john Doe', options: 'Details'},
    ] ;
    searchKey: string = '' ;

  constructor() { }

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
