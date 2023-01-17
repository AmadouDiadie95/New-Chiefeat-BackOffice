import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {RestAPIService} from "../../../services/rest-api.service";
import {IResponse} from "../../../models/base/IResponse";
import {Router} from "@angular/router";

@Component({
    selector     : 'auth-forgot-password',
    templateUrl  : './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthForgotPasswordComponent implements OnInit
{
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    forgotPasswordForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private restAPIService: RestAPIService,
        private router: Router
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
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if ( this.forgotPasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Forgot password
        this.restAPIService.save('auth/send_email_forget_pwd',this.forgotPasswordForm.get('email').value)
            .subscribe( (response: IResponse) => {
                if (response.ok) {
                    // Set the alert
                    this.alert = {
                        type   : 'success',
                        message: response.message
                    };
                    // Reset the form
                    this.forgotPasswordNgForm.resetForm();
                    setTimeout(()=> {
                        this.router.navigateByUrl('/confirmation-required') ;
                    }, 3000)

                } else {
                    console.log(response) ;
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: response.message
                    };
                }
                // Re-enable the form
                this.forgotPasswordForm.enable();
                // Show the alert
                this.showAlert = true;
            }, error => {
                console.log(error) ;
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: 'Erreur de Connexion, veuillez Ressayez !'
                };
                // Re-enable the form
                this.forgotPasswordForm.enable();
                // Show the alert
                this.showAlert = true;
            } )

    }
}
