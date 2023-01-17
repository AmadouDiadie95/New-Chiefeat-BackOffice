import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CategoryModel} from "../../../../../models/entities/category.model";
import {map} from "rxjs/operators";
import {OrganizerModel} from "../../../../../models/entities/organizer.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {IResponse} from "../../../../../models/base/IResponse";
import {RestAPIService} from "../../../../../services/rest-api.service";
import {EventModel} from "../../../../../models/entities/event.model";
import {UtilsService} from "../../../../../services/utils.service";
import {FuseAlertService} from "../../../../../../@fuse/components/alert";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {months} from "../../../../../shared/shared.const";
import {TicketPriceModel} from "../../../../../models/entities/ticketPrice.model";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    providers: [DatePipe]
})
export class EditComponent implements OnInit {
    // minDate = new Date(1900, 0, 1);
    // maxDate =  new Date(new Date().setDate(new Date().getDate())) ;
    minDate = new Date(new Date().setDate(new Date().getDate()));
    imageFile: File = new File([], '');
    imageTrendFile: File = new File([], '') ;
    formData: FormData = new FormData();
    allCategories: CategoryModel[] = [];
    allOrganizers: OrganizerModel[] = [];
    formGroup: FormGroup;
    errorMessage: string = 'Veuillez Ressayer !';
    configForm: FormGroup;
    organizerImage: string = '' ;
    eventImage: string = 'assets/images/logo/placeholder.png' ;
    eventImageTrend: string = 'assets/images/logo/placeholder.png' ;
    dataObtained : boolean = false ;
    event: EventModel = new EventModel() ;
    eventCopied: EventModel ;
    eventId : number ;
    totalTicketAvailable: number = 0 ;


    constructor(private sanitizer: DomSanitizer,
                // private store: Store,
                private _formBuilder: FormBuilder,
                private _fuseConfirmationService: FuseConfirmationService,
                private restAPIService: RestAPIService,
                // private toastrService: ToastrService,
                private utilsService: UtilsService,
                private _fuseAlertService: FuseAlertService,
                public router: Router,
                private route: ActivatedRoute,
                private datePipe: DatePipe,
                private dataSubjectService: DataSubjectService,
                private _changeDetectorRef: ChangeDetectorRef
    ) {
        // Build the config form
        this.configForm = this._formBuilder.group({
            title: 'Confirmer',
            message: "Confirmer la Mise a jour de l'Evénement ?",
            icon: this._formBuilder.group({
                show: true,
                name: 'heroicons_outline:check',
                color: 'success'
            }),
            actions: this._formBuilder.group({
                confirm: this._formBuilder.group({
                    show: true,
                    label: 'Confirmer',
                    color: 'primary'
                }),
                cancel: this._formBuilder.group({
                    show: true,
                    label: 'Annuler'
                })
            }),
            dismissible: true
        });
    }


    ngOnInit(): void {
        this._fuseAlertService.dismiss('success_on_save') ;
        this._fuseAlertService.dismiss('error_on_save') ;
        this.dataSubjectService.event$.subscribe(value => {
            // console.log(value) ;
            if (value) {
                this.dataObtained = true ;
                this.event = value;
                this.eventCopied = {...this.event} ;
                this.eventId = this.event.id ;
                if (this.event.image) {
                    this.eventImage = this.restAPIService.getImage(this.event.image);
                }
                if (this.event.trendImagePath) {
                    this.eventImageTrend = this.restAPIService.getImage(this.event.trendImagePath);
                }
                if (this.event.organizer.account.avatar) {
                    this.organizerImage = this.restAPIService.getImage(this.event.organizer.account.avatar);
                }
                this.initFormBuilder();
            } else {
                this.findEvent(this.route.snapshot.params.id) ;
            }
        }) ;
        this.loadDataFromDB();
        // this.initFormBuilder();
    }

    private findEvent(id: number) {
        this.restAPIService.findById('api/events', id).subscribe((response:IResponse) => {
            if (response.ok){
                this.event = response.data ;
                this.eventCopied = {...this.event} ;
                this.dataObtained = true ;
                this.eventId = this.event.id ;
                this._fuseAlertService.dismiss('loading') ;
                if (this.event.image) {
                    this.eventImage = this.restAPIService.getImage(this.event.image);
                }
                if (this.event.trendImagePath) {
                    this.eventImageTrend = this.restAPIService.getImage(this.event.trendImagePath);
                }
                if (this.event.organizer.account.avatar) {
                    this.organizerImage = this.restAPIService.getImage(this.event.organizer.account.avatar);
                }
                this.initFormBuilder();
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

    /**
     * Upload image to given note
     *
     * @param note
     * @param fileList
     */
    uploadImage(fileList: FileList): void {
        // Return if canceled
        if (!fileList.length) {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        this.imageFile = file;
        // console.log(file)

        // Return if the file is not allowed
        if (!allowedTypes.includes(file.type)) {
            return;
        }

        this._readAsDataURL(file).then((data) => {
            // console.log(data) ;
            // Update the image
            this.eventImage = data;
        });
    }

    uploadImageTrend(fileList: FileList): void
    {
        // Return if canceled
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];
        this.imageTrendFile = file ;
        // console.log(file)

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        this._readAsDataURL(file).then((data) => {
            // console.log(data) ;
            // Update the image
            this.eventImageTrend = data;
        });
    }

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any> {
        // this.imageName = file.name ;
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

    private loadDataFromStore() {
        /*this.store.pipe(
            map((state: any) => state.GlobalState)).subscribe((globalState: GlobalState) => {
            if (globalState.allCategories.length > 0 ) {
                this.allCategories = globalState.allCategories;
            }
            if (globalState.allOrganizers.length > 0) {
                this.allOrganizers = globalState.allOrganizers;
            }
        });*/
    }

    loadDataFromDB() {
        this.getAllCategories();
        this.getAllOrganizers();
    }

    getAllCategories() {
        // console.log("get all Categories") ;
        /*this.restAPIService.findAll('api/categories').subscribe((response: IResponse) => {
            // console.log(response) ;
            if (response.ok) {
                this.store.dispatch({type: GlobalStateActionsTypesEnum.SET_ALL_CATEGORIES, payload: response.data});
            }
            this.loadDataFromStore() ;
        }, error => {
            console.log(error);
            this.loadDataFromStore() ;
        });*/

    }

    getAllOrganizers() {
        // console.log("get all Organizers") ;
        /*this.restAPIService.findAll('api/organizers').subscribe((response: IResponse) => {
            // console.log(response) ;
            if (response.ok) {
                this.store.dispatch({type: GlobalStateActionsTypesEnum.SET_ALL_ORGANIZERS, payload: response.data});
            }
            this.loadDataFromStore() ;
        }, error => {
            console.log(error);
            this.loadDataFromStore() ;
        });*/

    }

    private initFormBuilder() {
        this.formGroup = this._formBuilder.group({
            title: [this.eventCopied.title, [Validators.required]],
            description: [this.eventCopied.description],
            category: [this.eventCopied.category.name, [Validators.required]],
            organizer: [this.eventCopied.organizer.account.fullName, [Validators.required]],
            date: [new Date(this.eventCopied.date), [Validators.required]],
            startHourString: [this.eventCopied.startHourString, [Validators.required]],
            endHourString: [this.eventCopied.endHourString],
            place: [this.eventCopied.place, [Validators.required]],
            listTicketPrice : this._formBuilder.array([]),
            trending: [this.eventCopied.trending],
            trendVideoPath: [this.eventCopied.trendVideoPath]
        });
        // Iterate through them
        this.eventCopied.listTicketPrice.forEach((ticketPrice) => {

            // Create an email form group
            (this.formGroup.get('listTicketPrice') as FormArray).push(
                this._formBuilder.group({
                    id: [ticketPrice.id],
                    ticketName: [ticketPrice.ticketName],
                    price: [ticketPrice.price],
                    initialQuantityAvailable: [ticketPrice.initialQuantityAvailable],
                    quantityAvailable: [ticketPrice.quantityAvailable],
                    quantitySelled: [ticketPrice.quantitySelled],
                    totalMoneyObtained: [ticketPrice.totalMoneyObtained]
                })
            );
        });
    }

    onSubmit() {
        let isEverythingOk: boolean = true;
        if (this.formGroup.value.endHourString != null) {
            if (this.formGroup.value.startHourString.split(':')[0] > this.formGroup.value.endHourString.split(':')[0]) {
                isEverythingOk = false;
                this.errorMessage = 'La Date de Debut ne peut être Superieur à la date de fin !';
                this.showAlert('error_on_save');
            }
        }

        if ( this.formGroup.getRawValue()['trending'] && !this.imageTrendFile.name && !this.eventCopied.trendImagePath ) {
            isEverythingOk = false ;
            this.errorMessage = "Veuillez Fournir une Image Bandérole si L'Evénement est Immanquable !" ;
            this.showAlert('error_on_save') ;
        }

        if (isEverythingOk) {
            // Open the dialog and save the reference of it
            const dialogRef = this._fuseConfirmationService.open(this.configForm.value);
            // Subscribe to afterClosed from the dialog reference
            dialogRef.afterClosed().subscribe((result) => {
                // console.log(result);
                if (result === 'confirmed') {
                    let category = this.allCategories.find(elt => {return elt.name === this.formGroup.value.category ? elt : null}) ;
                    let organizer = this.allOrganizers.find(elt => {return elt.account.fullName === this.formGroup.value.organizer ? elt : null}) ;
                    this.event = {...this.formGroup.getRawValue()};
                    this.event.listTicketPrice.forEach( (ticketPrice) => {
                        ticketPrice.quantityAvailable = ticketPrice.initialQuantityAvailable - ticketPrice.quantitySelled ;
                    } ) ;
                    this.event.category = category ;
                    this.event.organizer = organizer ;
                    this.event.activate = true;
                    this.event.initialTotalTicketAvailable = this.totalTicketAvailable ;
                    this.event.totalTicketSelled = this.eventCopied.totalTicketSelled ;
                    this.event.totalTicketAvailable = this.event.initialTotalTicketAvailable - this.event.totalTicketSelled ;
                    this.event.totalMoneyGaigned = this.eventCopied.totalMoneyGaigned ;
                    this.event.startHourNumber = parseInt(this.event.startHourString.split(':')[0]);
                    this.event.date = this.datePipe.transform(this.event.date, 'dd/MM/yyyy');
                    this.event.dateReversed = this.event.date.split('/').reverse().join('/') ;
                    this.event.dateToShow = this.event.date.split('/')[0]
                        + ' ' + months[parseInt(this.event.date.split('/')[1])] + ' ' + this.event.date.split('/')[2] ;
                    this.event.completeEventTime = 'Date : ' + this.event.date + ', Heure : ' + this.event.startHourString;
                    if (this.formGroup.value.endHourString != null) {
                        this.event.endHourNumber = parseInt(this.event.endHourString.split(':')[0]);
                        this.event.durationNumber = this.event.endHourNumber - this.event.startHourNumber;
                        this.event.durationString = this.event.durationNumber + 'H';
                        this.event.done = false;
                        this.event.completeEventTime += ' - ' + this.event.endHourString;
                    }
                    this.event.completeEventTime += ', Lieu : ' + this.event.place;
                    if (this.imageFile.name != '') {
                        this.event.image = this.imageFile.name;
                    } else {
                        this.event.image = this.eventCopied.image ;
                    }
                    if (this.imageTrendFile.name != '') {
                        this.event.trendImagePath = this.imageTrendFile.name;
                    } else {
                        this.event.trendImagePath = this.eventCopied.trendImagePath ;
                    }
                    this.addTicketPriceArrays() ;

                }
            });
        }

    }

    private addTicketPriceArrays() {
        let listTicketPriceToCreate: Array<TicketPriceModel> = new Array<TicketPriceModel>() ;
        let listTicketPriceToUpdateOrDelete: Array<TicketPriceModel> = new Array<TicketPriceModel>() ;
        let listTicketPriceToUpdate: Array<TicketPriceModel> = new Array<TicketPriceModel>() ;
        let listTicketPriceToDelete: Array<TicketPriceModel> = new Array<TicketPriceModel>() ;
        this.event.listTicketPrice.forEach(ticketPrice => {
            if (!ticketPrice.id) { // If TicketPrice doesn't got id, his is new
                listTicketPriceToCreate.push(ticketPrice) ;
            } else  {
                listTicketPriceToUpdateOrDelete.push(ticketPrice) ;
            }
        }) ;
        this.eventCopied.listTicketPrice.forEach(ticketPrice => {
            if (listTicketPriceToUpdateOrDelete.some(elt => elt.id === ticketPrice.id)) {
                listTicketPriceToUpdate.push(ticketPrice) ;
            } else {
                listTicketPriceToDelete.push(ticketPrice) ;
            }
        }) ;
        //console.clear() ;
        /*console.log("listTicketPriceToCreate => ") ;
        console.log(listTicketPriceToCreate) ;
        console.log("listTicketPriceToUpdateOrDelete => ") ;
        console.log(listTicketPriceToUpdateOrDelete) ;
        console.log("listTicketPriceToUpdate => ") ;
        console.log(listTicketPriceToUpdate) ;
        console.log("listTicketPriceToDelete => ") ;
        console.log(listTicketPriceToDelete) ;*/
        let TicketPriceArraysWrapper : any = {
            event: this.event,
            listTicketPriceToCreate,
            listTicketPriceToUpdate,
            listTicketPriceToDelete
        } ;
        this.formData = new FormData() ;
        this.formData.append('file', this.imageFile, this.imageFile.name) ;
        this.formData.append('fileTrend', this.imageTrendFile, this.imageTrendFile.name);
        // this.formData.append('entity', JSON.stringify(this.event));
        this.formData.append('entity', JSON.stringify(TicketPriceArraysWrapper));
        // console.log(TicketPriceArraysWrapper) ;
        /*this.formData.forEach((value,key) => {
            console.log(key+" "+value)
        });*/
        this.saveToDatabase(this.formData);
    }


    showAlert(name: string): void {
        this._fuseAlertService.show(name);
    }

    saveToDatabase(requestBody: any) {
        this.restAPIService.put('api/events',this.eventId, requestBody).subscribe((response: IResponse) => {
            if (response.ok) {
                this.showAlert('success_on_save');
                // this.dataSubjectService.dispatchEvent(response.data);
                setTimeout(() => {
                    this.router.navigateByUrl('apps/event-detail/detail/'+response.data.id);
                }, 2000);
            } else {
                this.errorMessage = response.message;
                this.showAlert('error_on_save');
            }
        }, error => {
            console.log(error);
            this.errorMessage = "Veuillez Ressayer !";
            this.showAlert('error_on_save');
        });
    }

    addNewTicket(ticketName:string = '',
                 price:number = 0,
                 quantityAvailable: number = 0,
                 quantitySelled: number = 0,
                 totalMoneyObtained: number = 0,
    ): void
    {
        // Create an empty email form group
        const ticketPriceFormGroup = this._formBuilder.group({
            ticketName: [ticketName],
            price: [price],
            initialQuantityAvailable: [quantityAvailable],
            quantityAvailable: [quantityAvailable],
            quantitySelled: [quantitySelled],
            totalMoneyObtained: [totalMoneyObtained]
        });

        // Add the email form group to the emails form array
        (this.formGroup.get('listTicketPrice') as FormArray).push(ticketPriceFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    removeTicket(index: number): void
    {
        // Get form array for emails
        const ticketPriceFormArray = this.formGroup.get('listTicketPrice') as FormArray;

        // Remove the email field
        ticketPriceFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    getTotalTickets(): number {
        this.totalTicketAvailable = 0 ;
        this.formGroup.value.listTicketPrice.forEach(ticketPrice => {
            this.totalTicketAvailable += ticketPrice.initialQuantityAvailable ;
        }) ;
        return this.totalTicketAvailable ;
    }

}


