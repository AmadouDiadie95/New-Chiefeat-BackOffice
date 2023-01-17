import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseAlertService } from '@fuse/components/alert';
import {UserModel} from "../../../../../models/auth/user.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {Router} from "@angular/router";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {errorSaveDialogConfig, successSaveDialogConfig} from "../../../../../shared/shared.const";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
    accountForm: FormGroup;
    user: UserModel = JSON.parse( localStorage.getItem('userLogged') );
    errorMessage: string = 'Veuillez Ressayer !' ;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private restAPIService: RestAPIService,
        private _fuseAlertService: FuseAlertService,
        private _changeDetectorRef: ChangeDetectorRef,
        private dataSubjectService: DataSubjectService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        /*this.dataSubjectService.user$.subscribe(value => {
            if (value) {
                this.user = value ;
            } else {
                this.user  = JSON.parse( localStorage.getItem('userLogged') );
            }
        }) ;*/
        this.setFormValue() ;
    }

    public setFormValue() {
        // Create the form
        this.accountForm = this._formBuilder.group({
            firstName: [this.user.firstName],
            lastName: [this.user.lastName],
            email: [this.user.email],
            address: [this.user.address],
            phone: [this.user.phone]
        });
    }

    updateUser() {
        this.user.firstName = this.accountForm.value.firstName ;
        this.user.lastName = this.accountForm.value.lastName ;
        this.user.email = this.accountForm.value.email ;
        this.user.phone = this.accountForm.value.phone ;
        this.user.address = this.accountForm.value.address ;
        this.user.activate = true ;
        this.user.active = true ;
        this.restAPIService.putWithoutId('users/update', this.user).subscribe( data => {
            if (data.ok) {
                // Toggle the edit mode off
                //  this.reloadCurrentPage('settings/' + this.user.id) ;
                // Mark for check
                localStorage.setItem('userLogged', JSON.stringify(data.data)) ;
                this.dataSubjectService.dispatchData('userLogged',data.data) ;
                this.user = data.data ;
                this._changeDetectorRef.markForCheck();
                setTimeout(()=>{
                    this._fuseConfirmationService.open(successSaveDialogConfig).afterClosed().subscribe(value => {
                        if (value) {
                            window.location.reload();
                        }
                    });
                }, 300)
            } else {
                this.errorMessage = data.message ;
                let errorConfig = errorSaveDialogConfig ;
                errorConfig.message = data.message ;
                this._fuseConfirmationService.open(errorConfig);
            }
        }, error => {
            console.log(error) ;
            this._fuseConfirmationService.open(errorSaveDialogConfig);
        }) ;
    }
}
