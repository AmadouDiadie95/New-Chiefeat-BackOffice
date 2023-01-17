import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseValidators } from '@fuse/validators';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthBody} from "../../../utils/auth-body";
import {RestAPIService} from "../../../services/rest-api.service";
import {IResponse} from "../../../models/base/IResponse";

@Component({
    selector     : 'auth-reset-password',
    templateUrl  : './reset-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthResetPasswordComponent implements OnInit
{
    @ViewChild('resetPasswordNgForm') resetPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    resetPasswordForm: FormGroup;
    showAlert: boolean = false;

    userId = this.route.snapshot.params['id'].split('_')[1] ;
    authBody: AuthBody = new AuthBody() ;
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private restAPIService: RestAPIService
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
        console.log(this.userId) ;
        // Create the form
        this.resetPasswordForm = this._formBuilder.group({
                password       : ['', Validators.required],
                passwordConfirm: ['', Validators.required]
            },
            {
                validators: FuseValidators.mustMatch('password', 'passwordConfirm')
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Reset password
     */
    resetPassword(): void
    {
        // Return if the form is invalid
        if ( this.resetPasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.resetPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Send the request to the server
        this.authBody.userId = this.userId ;
        this.authBody.newPassword = this.resetPasswordForm.get('password').value;

        this.restAPIService.save('auth/reset_pwd', this.authBody)
            .subscribe( (response: IResponse) => {
                if (response.ok) {
                    // Set the alert
                    this.alert = {
                        type   : 'success',
                        message: response.message
                    };
                    // Reset the form
                    this.resetPasswordNgForm.resetForm();
                    setTimeout( ()=> {
                        this.router.navigateByUrl('/sign-in')
                    }, 2000 )
                } else {
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: response.message
                    };
                }
                // Re-enable the form
                this.resetPasswordForm.enable();
                // Show the alert
                this.showAlert = true;
            }, error => {
                console.log(error) ;
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Erreur de Connexion, Veuillez Ressayez !.'
                };
                // Re-enable the form
                this.resetPasswordForm.enable();
                // Show the alert
                this.showAlert = true;
            } )

    }
}
