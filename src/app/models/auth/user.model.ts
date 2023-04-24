import {BaseEntityModel} from "../base/BaseEntity.model";
import {RoleModel} from "./role.model";

export class UserModel extends BaseEntityModel {
    lastName : string = ''  ;
    firstName : string = ''  ;
    fullName : string = ''  ;
    username : string = ''  ;
    password : string = ''  ;
    avatar? : string = ''  ;
    active? : boolean = false ;
    admin? : boolean = false ;
    email? : string = ''  ;
    phone? : string = ''  ;
    address? : string = ''  ;

}
