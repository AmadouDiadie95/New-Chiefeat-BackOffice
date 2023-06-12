import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ContactsListComponent } from 'app/modules/admin/apps/users/list/list.component';
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {UserModel} from "../../../../../models/auth/user.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {FuseAlertService} from "../../../../../../@fuse/components/alert";
import {RoleModel} from "../../../../../models/auth/role.model";
import {IResponse} from "../../../../../models/base/IResponse";

@Component({
    selector       : 'contacts-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
    user: UserModel;
    userForm: FormGroup;
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    listRoles: RoleModel[] ;

    updateUser: boolean = false ;
    errorMessage: string = 'Veuillez Ressayer !' ;

    userLogged: UserModel = JSON.parse( localStorage.getItem('userLogged') ) || new UserModel() ;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsListComponent:ContactsListComponent,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private dataSubjectService:DataSubjectService,
        private restAPIService: RestAPIService,
        private _fuseAlertService: FuseAlertService
    )
    {
        this.userLogged.admin = true ;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // console.log(this._activatedRoute) ;
        // Open the drawer
        this._contactsListComponent.matDrawer.open();
        // Get new user
        this.dataSubjectService.user$.subscribe((user:UserModel) => {
            this.user = user;
            if (!user.id) {
                // console.log("new USER") ;
                // Open the drawer in case it is closed
                this.updateUser = false;
                // Create the contact form
                this.userForm = this._formBuilder.group({
                    lastName: ['', [Validators.required]],
                    firstName: ['', [Validators.required]],
                    email: ['', [Validators.required]],
                    phone: [''],
                    address: ['']
                });
                this._contactsListComponent.matDrawer.open().then(() => {
                    this.toggleEditMode(true);
                });

            } else {
                // console.log("selected USER")
                this.updateUser = true;
                // Create the contact form
                this.userForm = this._formBuilder.group({
                    lastName: [user.lastName, [Validators.required]],
                    firstName: [user.firstName, [Validators.required]],
                    email: [user.email, [Validators.required]],
                    password: [''],
                    phone: [user.phone],
                    address: [user.address]
                });
                this._contactsListComponent.matDrawer.open().then(() => {
                    this.toggleEditMode(false);
                });
                // console.log(this.userForm)
            }
            this._changeDetectorRef.markForCheck();

        })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    saveUser() {
        this.user.firstName = this.userForm.value.firstName ;
        this.user.lastName = this.userForm.value.lastName ;
        if (this.userForm.value.password != '') {
            this.user.password = this.userForm.value.password;
        }
        this.user.phone = this.userForm.value.phone ;
        this.user.address = this.userForm.value.address ;
        this.user.email = this.userForm.value.email ;
        this.user.activate = true ;
        this.user.active = true ;
        this.user.username = this.user.email ;
        this.user.admin = this.userForm.value.role === 'ADMIN'  ;
        this.user.avatar = 'unknow.jpg'  ;
        // console.log(this.user) ;
        if (!this.updateUser) {
            this.restAPIService.save('managements/admins', this.user).subscribe( (data:IResponse) => {
                if (data.ok) {
                    this.showAlert('success_on_save') ;
                    // Toggle the edit mode off
                    setTimeout(()=>{
                        this.toggleEditMode(false);
                        this.reloadCurrentPage('apps/users') ;
                    }, 2000) ;
                } else {
                    this.errorMessage = data.message ;
                    this.showAlert('error_on_save') ;
                }
            }, error => {
                console.log(error) ;
                this.showAlert('error_on_save') ;
            }) ;
        } else {
            this.restAPIService.put('managements/admins', this.user.id, this.user).subscribe( data => {
                if (data.ok) {
                    this.showAlert('success_on_save') ;
                    // Toggle the edit mode off
                    setTimeout(()=>{
                        this.toggleEditMode(false);
                        this.reloadCurrentPage('apps/users') ;
                    }, 2000) ;
                } else {
                    this.errorMessage = data.message ;
                    this.showAlert('error_on_save') ;
                }
            }, error => {
                console.log(error) ;
                this.showAlert('error_on_save') ;
            })
        }
    }

    showAlert(name: string, errorMessage?:string): void
    {
        this._fuseAlertService.show(name);
    }

    /**
     * Delete the contact
     */
    deleteUser(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Supprimer Utilisateur',
            message: 'Etes-vous sûre de vouloir supprimer cet Utilisateur ? Cette action est irreversible !',
            actions: {
                confirm: {
                    label: 'Supprimer'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {


                // Delete the contact
                this.restAPIService.deleteById('managements/admins', this.user.id)
                    .subscribe((data:IResponse) => {

                        // Return if the contact wasn't deleted...
                        if ( data.ok )
                        {
                            this.showAlert('success_on_save') ;
                            // this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                            // Toggle the edit mode off
                            this.toggleEditMode(false);
                            // Mark for check
                            this._changeDetectorRef.markForCheck();
                            setTimeout( ()=>{
                                this.reloadCurrentPage('apps/users') ;
                            }, 1000 )  ;

                        } else
                        {
                            this.showAlert('error_on_save') ;

                        }

                    }, error => {
                        console.log(error) ;
                        this.showAlert('error_on_save') ;
                    });


            }
        });

    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._contactsListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void
    {
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }




    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    reloadCurrentPage(url: string) {
        this._router.navigate([url])
            .then(() => {
                window.location.reload();
            });
        // window.location.reload();
        // this.router.navigate([this.router.url])
    }

    getRoles() {
        this.restAPIService.findAll('roles').subscribe((response:IResponse) => {
            if (response.ok) {
                this.listRoles = response.data ;
                console.log(this.listRoles.filter(role => (role.name === 'EDITEUR')))
            }
        }, error => {
            console.log(error) ;
        })
    }

}
