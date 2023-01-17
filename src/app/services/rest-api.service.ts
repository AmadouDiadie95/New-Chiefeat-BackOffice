import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

    urlBackend = environment.urlBackend ;
    readonly httpOptions: any;

    constructor(private httpClient : HttpClient) {
        // this.httpOptions = new Utils().httpHeaders();
    }

    findAll(entityName):Observable<any>{
        console.log("Request FindAll : " + this.urlBackend + "/" + entityName) ;
        return this.httpClient.get<Observable<any>>(this.urlBackend + "/" +  entityName) ;
    }

    findById(entityName, id:number):Observable<any>{
        console.log("Request FindById : " + this.urlBackend + "/" + entityName + "/" + id) ;
        return this.httpClient.get<Observable<any>>(this.urlBackend + "/" + entityName + "/" + id, this.httpOptions) ;

    }

    save(entityName, resuestBody : any):Observable<any>{
        console.log("Request save : " + this.urlBackend + "/" + entityName) ;
        console.log("Object Send to save : ") ;
        console.log(resuestBody) ;
        return this.httpClient.post<Observable<any>>(this.urlBackend + "/" +  entityName, resuestBody) ;

    }

    put(entityName, id: number, resuestBody: any): Observable<any> {
        console.log("Request put (update) : " + this.urlBackend + entityName + "/" + id);
        console.log("Object Send to update : ");
        console.log(resuestBody);
        return this.httpClient.put<Observable<any>>(this.urlBackend + "/" + entityName + "/" + id, resuestBody, this.httpOptions);
    }

    putWithoutId(entityName, resuestBody: any): Observable<any> {
        console.log("Request put (update) : " + this.urlBackend + entityName);
        console.log("Object Send to update : ");
        console.log(resuestBody);
        return this.httpClient.put<Observable<any>>(this.urlBackend + "/" + entityName, resuestBody, this.httpOptions);
    }

    deleteById(entityName, id: number): Observable<any> {
        console.log("Request delete : " + this.urlBackend + "/" + entityName + "/" + id);
        // console.log("Object Id Send to delete : ");
        // console.log(id);
        return this.httpClient.delete<Observable<any>>(this.urlBackend + "/" + entityName + "/" + id, this.httpOptions);

    }

    findByOneAttribut(entityName, yourRequest: string, params1Value: any): Observable<any> {
        console.log("Request Find" + yourRequest + " : " + this.urlBackend + "/" + entityName + "/" + yourRequest + "/" + params1Value);
        return this.httpClient.get<Observable<any>>(this.urlBackend + "/" + entityName + "/" + yourRequest + "/" + params1Value, this.httpOptions);
    }

    findByTwoAttribut(entityName, yourRequest: string, params1Name: string, params1Value: any, params2Name: string, params2Value: any): Observable<any> {
        console.log("Request Find" + yourRequest + " : " + this.urlBackend + "/" + entityName + "/" + yourRequest + "?"
            + params1Name + "=" + params1Value + "&" + params2Name + "=" + params2Value);
        return this.httpClient.get<Observable<any>>(this.urlBackend + "/" + entityName + "/" + yourRequest + "?"
            + params1Name + "=" + params1Value + "&" + params2Name + "=" + params2Value, this.httpOptions);
    }

    findByThreeAttribut(entityName, yourRequest: string, params1Name: string, params1Value: any,
                        params2Name: string, params2Value: any, params3Name: string, params3Value: any): Observable<any> {
        console.log("Request Find" + yourRequest + " : " + this.urlBackend + "/" + entityName + "/" + yourRequest + "?"
            + params1Name + "=" + params1Value + "&" + params2Name + "=" + params2Value + "&" + params3Name + "=" + params3Value);
        return this.httpClient.get<Observable<any>>(this.urlBackend + "/" + entityName + "/" + yourRequest + "?"
            + params1Name + "=" + params1Value + "&" + params2Name + "=" + params2Value + "&" + params3Name + "=" + params3Value, this.httpOptions);
    }

    getImage(imageName: string): string {
        // console.log("request find Image : " + this.urlBackend + "/download/" + imageName) ;
        return this.urlBackend + "/download/" + imageName;
    }

}
