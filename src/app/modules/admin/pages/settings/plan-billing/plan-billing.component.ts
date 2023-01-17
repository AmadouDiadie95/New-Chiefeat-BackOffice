import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {GlobalSettingModel} from "../../../../../models/entities/globalSetting.model";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {FuseAlertService} from "../../../../../../@fuse/components/alert";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {Router} from "@angular/router";
import {errorSaveDialogConfig, successSaveDialogConfig} from "../../../../../shared/shared.const";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";

@Component({
    selector       : 'settings-plan-billing',
    templateUrl    : './plan-billing.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPlanBillingComponent implements OnInit
{
    plans: any[];
    globalSetting: GlobalSettingModel ;

    srcImage: any ;
    imageName: string ;
    imageFile: File ;
    formData: FormData = new FormData();

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
        this.getGlobalSetting() ;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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

    getGlobalSetting() {
        this.restAPIService.findById('api/globalSettings', 1).subscribe(data=> {
            console.log(data) ;
                if (data.ok) {
                    this.globalSetting = data.data ;
                    this.srcImage = this.restAPIService.getImage(this.globalSetting.frontHomeImage) ;
                    this._changeDetectorRef.markForCheck() ;
                } else {
                    console.log(data.message) ;
                }
            }, error => {
            console.log(error) ;
        }) ;
    }

    uploadImage(fileList: FileList): void
    {
        // Return if canceled
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        this.imageFile = file ;

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        this._readAsDataURL(file).then((data) => {
            // console.log(data) ;
            // Update the image
            this.srcImage = data;
            this._changeDetectorRef.markForCheck() ;
        });
    }

    private _readAsDataURL(file: File): Promise<any>
    {
        this.imageName = file.name ;
        // Return a new promise
        return new Promise((resolve, reject) => {

            // Create a new reader
            const reader = new FileReader();

            // Resolve the promise on success
            reader.onload = (): void => {
                resolve(reader.result);
            };

            // Reject the promise on error
            reader.onerror = (e): void => {
                reject(e);
            };

            // Read the file as the
            reader.readAsDataURL(file);
        });
    }

    testBeforeSave() {
        if (this.imageName && this.imageFile) {
            this.formData.append('file', this.imageFile, this.imageFile.name) ;
            this.formData.append('entity', JSON.stringify(this.globalSetting));
            // console.log(this.globalSetting) ;
            this.saveGlobalSetting() ;
        }
    }

    saveGlobalSetting() {
        let errorConfig = errorSaveDialogConfig ;
        this.restAPIService.put('api/globalSettings/imageUpdate', 1, this.formData).subscribe( data => {
            if (data.ok) {
                setTimeout(()=>{
                    this.globalSetting = data.data ;
                    this._fuseConfirmationService.open(successSaveDialogConfig).afterClosed().subscribe(value => {
                        if (value) {
                            window.location.reload();
                        }
                    });
                }, 300) ;
            } else {
                errorConfig.message = data.message ;
                this._fuseConfirmationService.open(errorConfig);
            }
        }, error => {
            console.log(error) ;
            this._fuseConfirmationService.open(errorSaveDialogConfig);
        }) ;
    }
}
