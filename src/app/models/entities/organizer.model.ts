import {BaseEntityModel} from "../base/BaseEntity.model";
import {UserModel} from "../auth/user.model";
import {EventModel} from "./event.model";
import {ScannerModel} from "./scanner.model";

export class OrganizerModel extends BaseEntityModel{
    account: UserModel = new UserModel() ;
    eventList: EventModel[] ;
    scannersList: ScannerModel[] ;
}
