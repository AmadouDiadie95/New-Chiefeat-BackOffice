import {BaseEntityModel} from "../base/BaseEntity.model";
import {TicketModel} from "./ticket.model";

export class CodeQrModel extends BaseEntityModel{
    contenu: string ;
    validate: boolean = true ;
    ticket: TicketModel ;
}
