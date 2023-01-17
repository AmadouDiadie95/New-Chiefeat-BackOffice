import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { debounceTime, map, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { NotesService } from 'app/modules/admin/apps/notes/notes.service';
import { Label, Note, Task } from 'app/modules/admin/apps/notes/notes.types';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryModel} from "../../../../../models/entities/category.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {IResponse} from "../../../../../models/base/IResponse";
import {deleteDialogConfig, errorSaveDialogConfig, successSaveDialogConfig} from "../../../../../shared/shared.const";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
    selector       : 'notes-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesDetailsComponent implements OnInit, OnDestroy
{
    note$: Observable<Note>;
    labels$: Observable<Label[]>;

    noteChanged: Subject<Note> = new Subject<Note>();
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    horizontalStepperForm: FormGroup ;
    updating: boolean = false ;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) private _data: CategoryModel,
        private _notesService: NotesService,
        private _matDialogRef: MatDialogRef<NotesDetailsComponent>,
        private _formBuilder: FormBuilder,
        private restAPIService: RestAPIService,
        private _fuseConfirmationService: FuseConfirmationService,
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
        console.log(this._data)
        if (!this._data.id) {
            this.horizontalStepperForm = this._formBuilder.group({
                step1: this._formBuilder.group({
                    name: ['', [Validators.required]],
                    description: [''],
                })
            });
        } else {
            this.updating = true ;
            this.horizontalStepperForm = this._formBuilder.group({
                step1: this._formBuilder.group({
                    name: [this._data.name, [Validators.required]],
                    description: [this._data.description],
                })
            });
        }
    }

    onSubmit(){
        if (!this.updating) {
            let newCat: CategoryModel = new CategoryModel();
            newCat.name = this.horizontalStepperForm.value.step1.name;
            newCat.description = this.horizontalStepperForm.value.step1.description;
            this.restAPIService.save('api/categories', newCat).subscribe((response: IResponse) => {
                if (response.ok) {
                    this._matDialogRef.close(1) ;
                    this._fuseConfirmationService.open(successSaveDialogConfig).afterClosed().subscribe(value => {
                        if (value) {
                            window.location.reload();
                        }
                    });
                } else {
                    console.log(response.message);
                    let errorConfig = errorSaveDialogConfig;
                    errorConfig.message = response.message;
                    this._fuseConfirmationService.open(errorConfig);
                }
            }, error => {
                console.log(error);
                this._fuseConfirmationService.open(errorSaveDialogConfig);
            }) ;
        } else {
            this._data.name = this.horizontalStepperForm.value.step1.name;
            this._data.description = this.horizontalStepperForm.value.step1.description;
            this.restAPIService.put('api/categories', this._data.id, this._data).subscribe((response: IResponse) => {
                if (response.ok) {
                    this._matDialogRef.close(1) ;
                    this._fuseConfirmationService.open(successSaveDialogConfig).afterClosed().subscribe(value => {
                        if (value) {
                            window.location.reload();
                        }
                    });
                } else {
                    console.log(response.message);
                    let errorConfig = errorSaveDialogConfig;
                    errorConfig.message = response.message;
                    this._fuseConfirmationService.open(errorConfig);
                }
            }, error => {
                console.log(error);
                this._fuseConfirmationService.open(errorSaveDialogConfig);
            }) ;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    deleteCategory() {
        let errorDialog = deleteDialogConfig ;
        errorDialog.message  = "Etes-Vous Sure de Vouloir Supprimer la Categorie ? Cette Action est Irréversible et Supprimera tous les Evénements Liés !!!"
        this._fuseConfirmationService.open(errorDialog).afterClosed().subscribe((result)=> {
            console.log(result) ;
            if (result === 'confirmed') {
                this.restAPIService.deleteById('api/categories', this._data.id)
                .subscribe((response:IResponse) => {
                    if (response.ok) {
                        this._matDialogRef.close(1) ;
                        this._fuseConfirmationService.open(successSaveDialogConfig).afterClosed().subscribe(value => {
                            if (value) {
                                window.location.reload();
                            }
                        });
                    } else {
                        console.log(response.message);
                        let errorConfig = errorSaveDialogConfig;
                        errorConfig.message = response.message;
                        this._fuseConfirmationService.open(errorConfig);
                    }
                }, error => {
                    console.log(error);
                    this._fuseConfirmationService.open(errorSaveDialogConfig);
                }) ;
            }
        })
    }
}
