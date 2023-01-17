import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {fuseAnimations} from '@fuse/animations';
import {FuseAlertType} from '@fuse/components/alert';
import {AuthBody} from "../../../utils/auth-body";
import {AuthService} from 'app/services/auth.service';
import {DataSubjectService} from "../../../services/data-subject.service";
import {TYPE_USER} from "../../../models/auth/user.model";

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    loginFormSubmitted = false;
    isLoginFailed = false;
    authBody: AuthBody;
    loginForm: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private authService: AuthService,
        private dataSubjectService: DataSubjectService
    )
    {
        this.authBody = new AuthBody();
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
        /*this.signInForm = this._formBuilder.group({
            email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
            password  : ['admin', Validators.required],
            rememberMe: ['']
        });*/
        ////////////////
        localStorage.removeItem('app-token');
        localStorage.removeItem('isLoggedin');
        // Create the form
        this.loginForm = new FormGroup({
            email: new FormControl('ticket_admin@gmail.com', [Validators.required]),
            password: new FormControl('ticket@admin2K22', [Validators.required])
            /*email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])*/
        });
        ////////////////
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {
        // this.loginFormSubmitted = true;
        // Return if the form is invalid
        /*if ( this.signInForm.invalid )
        {
            return;
        }*/

        // Disable the form
        // this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        if (this.loginForm.value.email && this.loginForm.value.password) {
            // console.log(this.loginForm.value)
            this.authBody.email = this.loginForm.value.email;
            this.authBody.password = this.loginForm.value.password;
            this.authBody.typeUser = TYPE_USER.ADMIN ;
            console.log(this.authBody) ;
            this.authService.login({username: this.authBody.email, password: this.authBody.password, typeUser: TYPE_USER.ADMIN}).subscribe(
                (ret:any) => {
                    console.log(ret) ;
                if (ret) {
                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    // this._router.navigateByUrl(redirectURL);
                    localStorage.setItem('app-token', btoa(JSON.stringify(ret['data'].token)));
                    localStorage.setItem('isLoggedin', 'true');
                    localStorage.setItem('userLogged', JSON.stringify(ret.data.user));
                    this.dataSubjectService.dispatchData('userLogged',ret.data.user) ;
                    // this.dataSubjectService.dispatchData('authToken',ret.data.user) ;
                    // console.log('*********************************************')
                    this._router.navigateByUrl('/dashboard');

                } else {
                    // Re-enable the form
                    // this.signInForm.enable();

                    // Reset the form
                    // this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: ret.message
                    };

                    // Show the alert
                    this.showAlert = true;
                }
                }, error => {
                    console.log(error) ;
                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Email ou Mot de passe Incorrect...'
                    };

                    // Show the alert
                    this.showAlert = true;
                } );

        } else {
// Re-enable the form
            // this.signInForm.enable();

            // Reset the form
            // this.signInNgForm.resetForm();

            // Set the alert
            this.alert = {
                type   : 'error',
                message: 'Wrong email or password'
            };

            // Show the alert
            this.showAlert = true;
        }
    }
}
