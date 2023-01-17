import {BaseEntityModel} from "../base/BaseEntity.model";
import {CategoryModel} from "./category.model";
import {OrganizerModel} from "./organizer.model";
import {TicketPriceModel} from "./ticketPrice.model";

export class EventModel extends BaseEntityModel{
    title: string ;
    description: string ;
    date: string ;
    dateReversed: string ;
    dateToShow: string ;
    place: string ;
    listTicketPrice: TicketPriceModel[] = [] ;
    startHourString: string ;
    endHourString: string ;
    durationString: string ;
    startHourNumber: number ;
    endHourNumber: number ;
    durationNumber: number ;
    completeEventTime: string ;
    done: boolean = false ;
    image: string ;
    initialTotalTicketAvailable: number ;
    totalTicketAvailable: number ;
    totalTicketSelled: number = 0 ;
    totalMoneyGaigned: number = 0;
    trending: boolean = false ;
    category: CategoryModel ;
    organizer: OrganizerModel ;
    trendImagePath?: string ;
    trendVideoPath?: string ;
}

