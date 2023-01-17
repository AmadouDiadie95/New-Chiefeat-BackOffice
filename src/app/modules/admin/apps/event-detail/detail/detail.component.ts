import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {EventModel} from "../../../../../models/entities/event.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IResponse} from "../../../../../models/base/IResponse";
import {FuseAlertService} from "../../../../../../@fuse/components/alert";
import {GlobalSettingModel} from "../../../../../models/entities/globalSetting.model";
import {FuseConfirmationConfig, FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {FormBuilder, FormGroup} from "@angular/forms";
import {environment} from "../../../../../../environments/environment";
import {errorSaveDialogConfig, successSaveDialogConfig} from "../../../../../shared/shared.const";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    event: EventModel = new EventModel() ;
    oldEventFeatured: EventModel = new EventModel() ;
    dataObtained : boolean = false ;
    organizerImage: string = 'assets/images/avatars/sidiki.jpeg' ;
    eventImage: string = 'assets/images/events-img/sidiki.jpeg' ;
    globalSetting: GlobalSettingModel ;
    configForm: FormGroup;
    errorSaveDialogConfig:FuseConfirmationConfig = errorSaveDialogConfig ;
    successSaveDialogConfig:FuseConfirmationConfig = successSaveDialogConfig ;

  constructor(private dataSubjectService: DataSubjectService,
              private _fuseConfirmationService: FuseConfirmationService,
              private router: Router,
              private restAPIService: RestAPIService,
              private route: ActivatedRoute,
              // private toastr: ToastrService,
              private _fuseAlertService: FuseAlertService,
              private _changeDetectorRef: ChangeDetectorRef,
              private _formBuilder: FormBuilder,

  ) {
      // Build the config form
      this.configForm = this._formBuilder.group({
          title      : 'Confirmer',
          message    : "Confirmer & Sauvegarder ?",
          icon       : this._formBuilder.group({
              show : true,
              name : 'heroicons_outline:check',
              color: 'success'
          }),
          actions    : this._formBuilder.group({
              confirm: this._formBuilder.group({
                  show : true,
                  label: 'Confirmer',
                  color: 'primary'
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
      // this.toastr.success('Test') ;
      this.getGlobalSetting() ;
      this.dataSubjectService.event$.subscribe(value => {
          // console.log(value) ;
          if (value) {
              this._fuseAlertService.dismiss('loading') ;
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
      }) ;
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

    showAlert(name: string): void
    {
        this._fuseAlertService.show(name);
    }

    trackByFn(index, item) {
        return index;
    }

    getGlobalSetting() {
      this.restAPIService.findById('api/globalSettings', 1).subscribe( (response:IResponse) => {
          if (response.ok) {
              this.globalSetting = response.data ;
              this._changeDetectorRef.markForCheck() ;
          } else {
              console.log(response.message) ;
          }
      }, error => {
          console.log(error) ;
      } )
    }

    setEventAsFeatured(){
      this.oldEventFeatured = {...this.globalSetting.eventFeatured} ;
      this.globalSetting.eventFeatured = this.event ;
        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            // console.log(result);
            if (result === 'confirmed') {
                this.restAPIService.put('api/globalSettings', 1, this.globalSetting).subscribe( (response:IResponse) => {
                    if (response.ok) {
                        this._fuseConfirmationService.open(this.successSaveDialogConfig);
                    } else {
                        this.globalSetting.eventFeatured = this.oldEventFeatured ;
                        console.log(response.message) ;
                        this._fuseConfirmationService.open(this.errorSaveDialogConfig);
                    }
                }, error => {
                    this.globalSetting.eventFeatured = this.oldEventFeatured ;
                    console.log(error) ;
                    this._fuseConfirmationService.open(this.errorSaveDialogConfig);
                } )
            } else {
                this.globalSetting.eventFeatured = this.oldEventFeatured ;
            }
        }) ;
    }

    showDashboard() {
        // this.dataSubjectService.dispatchEvent(this.event) ;
        this.router.navigateByUrl('dashboard/finance/' + this.event.id);
    }
}
