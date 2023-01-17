import {BaseEntityModel} from "../base/BaseEntity.model";
import {UserModel} from "../auth/user.model";
import {TicketModel} from "./ticket.model";
import {CodeQrModel} from "./codeQr.model";
import {OrganizerModel} from "./organizer.model";

export class ScannerModel extends BaseEntityModel{
    account: UserModel ;
    email: string ;
    phone: string ;
    listCodeQrScanned: CodeQrModel[] ;
    organizer: OrganizerModel ;
}
