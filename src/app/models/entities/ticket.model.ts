import {BaseEntityModel} from "../base/BaseEntity.model";
import {ClientModel} from "./client.model";
import {EventModel} from "./event.model";
import {CodeQrModel} from "./codeQr.model";
import {TicketPriceModel} from "./ticketPrice.model";
import {PersonModel} from "./person.model";

export class TicketModel extends BaseEntityModel{
    date: string ;
    numberOfPerson: number ;
    personList: PersonModel[] = [] ;
    totalMoneyPayed: number ;
    codeQr: CodeQrModel ;
    client: ClientModel ;
    event: EventModel ;
    ticketPrice: TicketPriceModel ;
    offerStatus: string ;
    offerTo: string ;
    offerBy: string ;
}
