import {BaseEntityModel} from "../base/BaseEntity.model";
import {EventModel} from "./event.model";

export class GlobalSettingModel extends BaseEntityModel {
  frontHomeImage: string;
  eventFeatured: EventModel ;
    trendImagePath?: string ;
    trendVideoPath?: string ;
}
