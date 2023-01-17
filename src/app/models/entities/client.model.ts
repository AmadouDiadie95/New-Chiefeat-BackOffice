import {BaseEntityModel} from "../base/BaseEntity.model";
import {UserModel} from "../auth/user.model";
import {TicketModel} from "./ticket.model";

export class ClientModel extends BaseEntityModel{
    account: UserModel ;
    email: string ;
    phone: string ;
    quarter: string ;
    ageInterval: string ;
    ticketList: TicketModel[] ;
}
