import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuseAlertService } from '@fuse/components/alert';
import {UserModel} from "../../../../../models/auth/user.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {Router} from "@angular/router";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {Observable} from "rxjs";
import {errorSaveDialogConfig, successSaveDialogConfig} from "../../../../../shared/shared.const";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSecurityComponent implements OnInit
{
    securityForm: FormGroup;
    user: UserModel = JSON.parse( localStorage.getItem('userLogged') ) ;
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
        this.setFormValue() ;
    }

    setFormValue() {

        // Create the form
        this.securityForm = this._formBuilder.group({
            currentPassword  : [''],
            newPassword      : [''],
            newPasswordConfirm : ['']
            /*
            twoStep          : [true],
            askPasswordChange: [false]
            */
        });
    }

    updateUser() {
        console.log(this.securityForm.value) ;
        console.log(this.user) ;
        let errorConfig = errorSaveDialogConfig ;
        if (this.securityForm.value.newPassword != this.securityForm.value.newPasswordConfirm) {
            this.errorMessage = "Les Nouveaux Mot de Passe ne correspondent pas! " ;
            errorConfig.message = this.errorMessage ;
            this._fuseConfirmationService.open(errorConfig);
        } else {
            let authBody: any = {} ;
            authBody.userId = this.user.id ;
            authBody.username = this.user.username ;
            authBody.password = this.user.password ;
            authBody.oldPassword = this.securityForm.value.currentPassword ;
            authBody.newPassword = this.securityForm.value.newPassword ;
            this.restAPIService.save('auth/update_pwd', authBody).subscribe( data => {
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
                    }, 300) ;
                } else {
                    this.errorMessage = data.message ;
                    errorConfig.message = this.errorMessage ;
                    this._fuseConfirmationService.open(errorConfig);
                }
            }, error => {
                console.log(error) ;
                this._fuseConfirmationService.open(errorSaveDialogConfig);
            })
        }
    }


}
