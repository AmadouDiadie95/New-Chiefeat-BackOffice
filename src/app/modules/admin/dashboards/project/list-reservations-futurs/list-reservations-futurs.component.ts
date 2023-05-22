import {Component, Input, OnInit} from '@angular/core';
import {Booking} from "../../../../../models/chiefeat/booking";

@Component({
  selector: 'app-list-reservations-futurs',
  templateUrl: './list-reservations-futurs.component.html',
  styleUrls: ['./list-reservations-futurs.component.scss']
})
export class ListReservationsFutursComponent implements OnInit {

    @Input()
    bookingComing: Booking[] = [] ;
    bookingToShow: Booking[] = [] ;

    page: number = 0 ;
    size: number = 5 ;
    currentPage: number = 0 ;
    totalTickets: number = 0 ;
    totalPages: number = 1 ;

    columnsResasFuturs: string[] = ['Num de Réservation','Date de réservation','Date de préstation','Heure de préstation','Eater',"Chief"];
    listResasFuturs: any[] = [
        {numResas: '4466745645', dateResas: '01-01-2023', datePrestat: '04-01-2023', hourPrestat: '11h30', eater: 'Hugo LEVOIR', chief:'john Doe', options: 'Details'},
        {numResas: '4466745645', dateResas: '01-01-2023', datePrestat: '04-01-2023', hourPrestat: '11h30', eater: 'Hugo LEVOIR', chief:'john Doe', options: 'Details'},
        {numResas: '4466745645', dateResas: '01-01-2023', datePrestat: '04-01-2023', hourPrestat: '11h30', eater: 'Hugo LEVOIR', chief:'john Doe', options: 'Details'},
    ] ;
    searchKey: string = '' ;

  constructor() { }

  ngOnInit(): void {
        this.bookingToShow = this.bookingComing ;
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
        this.bookingToShow = this.bookingComing
            .filter(elt => elt.name?.toLowerCase().includes(this.searchKey.toLowerCase())
                || elt.id?.toString().toLowerCase().includes(this.searchKey.toLowerCase()) )
    }

}
