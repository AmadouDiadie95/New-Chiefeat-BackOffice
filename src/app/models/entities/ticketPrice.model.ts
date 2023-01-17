import {BaseEntityModel} from "../base/BaseEntity.model";
import {EventModel} from "./event.model";

export class TicketPriceModel extends BaseEntityModel {
    ticketName: string;
    price: number ;
    initialQuantityAvailable : number ;
    quantityAvailable : number ;
    quantitySelled : number = 0 ;
    totalMoneyObtained: number = 0;
    presentClientNumber: number = 0 ;
    missingClientNumber: number = 0 ;
    event?: EventModel ;
}
