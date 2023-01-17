import {BaseEntityModel} from "../base/BaseEntity.model";
import {EventModel} from "./event.model";

export class CategoryModel extends BaseEntityModel {
    name: string;
    description?: string ;
    eventList?: EventModel[]
}
