import { Component, OnInit } from '@angular/core';
import {EventModel} from "../../../../../models/entities/event.model";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IResponse} from "../../../../../models/base/IResponse";
import {FuseAlertService} from "../../../../../../@fuse/components/alert";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    event: EventModel = new EventModel() ;
    organizerImage: string = 'assets/images/avatars/sidiki.jpeg' ;
    eventImage: string = 'assets/images/events-img/sidiki.jpeg' ;
    dataObtained : boolean = false ;
    configForm: FormGroup;
    errorMessage: string = 'Veuillez Ressayer !' ;

    constructor(private dataSubjectService: DataSubjectService,
                private restAPIService: RestAPIService,
                private _formBuilder: FormBuilder,
                private _fuseConfirmationService: FuseConfirmationService,
                public router: Router,
                private route: ActivatedRoute,
                private _fuseAlertService: FuseAlertService,

    ) {
        // Build the config form
        this.configForm = this._formBuilder.group({
            title      : 'Supprimer un Evénement',
            message    : 'Etes-Vous Sure de Vouloir Supprimer ? <span class="font-medium">Cette Action est Irreversile !</span>',
            icon       : this._formBuilder.group({
                show : true,
                name : 'heroicons_outline:exclamation',
                color: 'warn'
            }),
            actions    : this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show : true,
                    label: 'Confirmer',
                    color: 'warn'
                }),
                cancel : this._formBuilder.group({
                    show : true,
                    label: 'Annuler'
                })
            }),
            dismissible: true
        });
    }

    ngOnInit(): void {
        this.dataSubjectService.event$.subscribe(value => {
            // console.log(value) ;
            if (value) {
                this.dataObtained = true ;
                this.event = value;
                if (this.event.image) {
                    this.eventImage = this.restAPIService.getImage(this.event.image);
                }
                if (this.event.organizer.account.avatar) {
                    this.organizerImage = this.restAPIService.getImage(this.event.organizer.account.avatar);
                }
            } else {
                this.findEvent(this.route.snapshot.params.id) ;
            }
        })
    }

    private findEvent(id: number) {
        this.restAPIService.findById('api/events', id).subscribe((response:IResponse) => {
            if (response.ok){
                this.event = response.data ;
                this.dataObtained = true ;
                this._fuseAlertService.dismiss('loading') ;
                if (this.event.image) {
                    this.eventImage = this.restAPIService.getImage(this.event.image);
                }
                if (this.event.organizer.account.avatar) {
                    this.organizerImage = this.restAPIService.getImage(this.event.organizer.account.avatar);
                }
            } else {
                this._fuseAlertService.dismiss('loading') ;
                this._fuseAlertService.show('loading_error') ;
            }
        }, error => {
            console.log(error) ;
            this._fuseAlertService.dismiss('loading') ;
            this._fuseAlertService.show('loading_error') ;
        })
    }

    onSubmit() {

        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            // console.log(result);
            if (result === 'confirmed') {
                this.deleteFromDB() ;
            }
        });
    }

    deleteFromDB(){
        this.restAPIService.deleteById('api/events', this.event.id).subscribe((response:IResponse) => {
            if (response.ok) {
                this.showAlert('success_on_save') ;
                setTimeout(()=>{
                    this.router.navigateByUrl('apps/event-list') ;
                }, 1000) ;
            } else {
                this.errorMessage = response.message ;
                this.showAlert('error_on_save') ;
            }
        }, error => {
            console.log(error) ;
            this.errorMessage = "Veuillez Ressayer !" ;
            this.showAlert('error_on_save') ;
        }) ;
    }

    showAlert(name: string): void
    {
        this._fuseAlertService.show(name);
    }

}
