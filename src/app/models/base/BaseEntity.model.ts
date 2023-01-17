export class BaseEntityModel {
    id: number
    createdBy?: string;
    lastModifiedBy?: string;
    createdAt?: any;
    lastModifiedAt?: any;
    activate? = true;
}
