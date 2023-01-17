import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {UserModel} from "../models/auth/user.model";
import {CategoryModel} from "../models/entities/category.model";
import {OrganizerModel} from "../models/entities/organizer.model";
import {EventModel} from "../models/entities/event.model";
import {ClientModel} from "../models/entities/client.model";
import {ScannerModel} from "../models/entities/scanner.model";

@Injectable({
  providedIn: 'root'
})
export class DataSubjectService {

  userLogged$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null) ;
  user$: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null) ;
  authToken$: BehaviorSubject<string> = new BehaviorSubject<string>(null) ;
    event$: BehaviorSubject<any> = new BehaviorSubject<any>(null) ;

  constructor() { }

    dispatchData(entityName: string, value: any) {

        switch (entityName) {
            case 'userLogged' :
                this.userLogged$.next(value) ; break ;
            case 'user' :
                this.user$.next(value) ; break ;
            case 'authToken' :
                this.authToken$.next(value) ; break ;
            default : break ;
        }

    }


}
