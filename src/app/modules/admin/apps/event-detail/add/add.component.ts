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
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {DataSubjectService} from "../../../../../services/data-subject.service";
import {months} from "../../../../../shared/shared.const";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [DatePipe]
})
export class AddComponent implements OnInit {

    // minDate = new Date(1900, 0, 1);
    // maxDate =  new Date(new Date().setDate(new Date().getDate())) ;
    minDate =  new Date(new Date().setDate(new Date().getDate())) ;
    image: string = 'assets/chiefeat/placeholder.png';
    imageTrend: string = 'assets/chiefeat/placeholder.png';
    imageFile: File = new File([], '') ;
    imageTrendFile: File = new File([], '') ;
    formData: FormData = new FormData();
    allCategories: CategoryModel[] = [] ;
    allOrganizers: OrganizerModel[] = [] ;
    isDataLoadedOne: boolean = false ;
    formGroup: FormGroup;
    event: EventModel = new EventModel() ;
    errorMessage: string = 'Veuillez Ressayer !' ;
    configForm: FormGroup;
    mapTicketNamePrice: any = [] ;
    totalTicketAvailable: number = 0 ;


  constructor(private sanitizer: DomSanitizer,
              // private store: Store,
              private restAPIService: RestAPIService,
              private _formBuilder: FormBuilder,
              private _fuseConfirmationService: FuseConfirmationService,
              // private toastrService: ToastrService,
              private utilsService: UtilsService,
              private _fuseAlertService: FuseAlertService,
              public router: Router,
              private datePipe: DatePipe,
              private dataSubjectService: DataSubjectService,
              private _changeDetectorRef: ChangeDetectorRef
              ) {
      // Build the config form
      this.configForm = this._formBuilder.group({
          title      : 'Confirmer',
          message    : "Confirmer l'Ajout de l'Evénement ?",
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
      this._fuseAlertService.dismiss('success_on_save') ;
      this._fuseAlertService.dismiss('error_on_save') ;
      this.loadDataFromDB() ;
      this.initFormBuilder();
  }

    /**
     * Upload image to given note
     *
     * @param note
     * @param fileList
     */
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
        // console.log(file)

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        this._readAsDataURL(file).then((data) => {
            // console.log(data) ;
            // Update the image
            this.image = data;
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
            this.imageTrend = data;
        });
    }

    /**
     * Read the given file for demonstration purposes
     *
     * @param file
     */
    private _readAsDataURL(file: File): Promise<any>
    {
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
            map( (state:any) => state.GlobalState)).subscribe((globalState:GlobalState) => {
            // console.log(globalState) ;
            if (globalState.allCategories.length > 0 ) {
                this.allCategories = globalState.allCategories;
            }
            if (globalState.allOrganizers.length > 0) {
                this.allOrganizers = globalState.allOrganizers;
                // console.log(this.allCategories) ;
            }
        }) ;*/
    }

    loadDataFromDB() {
        this.getAllCategories() ;
        this.getAllOrganizers() ;
    }

    getAllCategories() {
        // console.log("get all Categories") ;
        /*this.restAPIService.findAll('api/categories').subscribe((response:IResponse)=>{
            // console.log(response) ;
            if (response.ok) {
                this.store.dispatch({type: GlobalStateActionsTypesEnum.SET_ALL_CATEGORIES, payload:response.data}) ;
            }
            this.loadDataFromStore() ;
        },error => {
            console.log(error) ;
            this.loadDataFromStore() ;
        }) ;*/

    }

    getAllOrganizers() {
        // console.log("get all Organizers") ;
        /*this.restAPIService.findAll('api/organizers').subscribe((response:IResponse)=>{
            // console.log(response) ;
            if (response.ok) {
                this.store.dispatch({type: GlobalStateActionsTypesEnum.SET_ALL_ORGANIZERS, payload:response.data}) ;
            }
            this.loadDataFromStore() ;
        },error => {
            console.log(error) ;
            this.loadDataFromStore() ;
        }) ;*/

    }

    private initFormBuilder() {
        this.formGroup = this._formBuilder.group({
            title: ['', [Validators.required]],
            description: [''],
            category: [null, [Validators.required]],
            organizer: [null, [Validators.required]],
            date: [this.minDate, [Validators.required]],
            startHourString: [null, [Validators.required]],
            endHourString: [null],
            place: ['', [Validators.required]],
            listTicketPrice : this._formBuilder.array([]),
            trending: [false],
            trendVideoPath: ['']
        });
        this.addNewTicket('Normal') ;
    }



    onSubmit() {
        let isEverythingOk: boolean = true ;
        if (this.formGroup.value.endHourString != null) {
            if (this.formGroup.value.startHourString.split(':')[0] > this.formGroup.value.endHourString.split(':')[0]) {
                isEverythingOk = false ;
                this.errorMessage = 'La Date de Debut ne peut être Superieur à la date de fin !' ;
                this.showAlert('error_on_save') ;
            }
        }

        if (this.formGroup.getRawValue()['trending'] && !this.imageTrendFile.name) {
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
                    this.event = {...this.formGroup.getRawValue()};
                    this.event.listTicketPrice.forEach( (ticketPrice) => {
                        ticketPrice.quantityAvailable = ticketPrice.initialQuantityAvailable ;
                    } ) ;
                    this.event.activate = true ;
                    this.event.startHourNumber = parseInt(this.event.startHourString.split(':')[0]) ;
                    this.event.date = this.datePipe.transform(this.event.date, 'dd/MM/yyyy') ;
                    this.event.dateReversed = this.event.date.split('/').reverse().join('/') ;
                    this.event.dateToShow = this.event.date.split('/')[0]
                        + ' ' + months[parseInt(this.event.date.split('/')[1])] + ' ' + this.event.date.split('/')[2] ;
                    this.event.completeEventTime = 'Date : ' + this.event.date + ', Heure : ' + this.event.startHourString ;
                    if (this.formGroup.value.endHourString != null) {
                        this.event.endHourNumber = parseInt(this.event.endHourString.split(':')[0]);
                        this.event.durationNumber = this.event.endHourNumber - this.event.startHourNumber ;
                        this.event.durationString = this.event.durationNumber + 'H' ;
                        this.event.done = false ;
                        this.event.completeEventTime += ' - ' + this.event.endHourString ;
                    }
                    this.event.completeEventTime += ', Lieu : ' + this.event.place ;
                    this.event.image = this.imageFile.name || this.image ;
                    this.event.trendImagePath = this.imageTrendFile.name || this.imageTrend ;
                    this.event.totalTicketAvailable = this.event.initialTotalTicketAvailable = this.totalTicketAvailable ;
                    this.event.totalMoneyGaigned = 0 ;
                    this.formData = new FormData() ;
                    this.formData.append('file', this.imageFile, this.imageFile.name);
                    this.formData.append('fileTrend', this.imageTrendFile, this.imageTrendFile.name);
                    this.formData.append('entity', JSON.stringify(this.event));
                    // console.log(this.event) ;
                    /*this.formData.forEach((value,key) => {
                        console.log(key+" "+value)
                    });*/
                    this.saveToDatabase() ;
                    // this.store.dispatch({type:GlobalStateActionsTypesEnum.ADD_EVENT, payload:this.event}) ;
                }
            });
        }

    }



    showAlert(name: string): void
    {
        this._fuseAlertService.show(name);
    }

    saveToDatabase(){
        this.restAPIService.save('api/events', this.formData).subscribe((response:IResponse) => {
            if (response.ok) {
                this.showAlert('success_on_save') ;
                // this.dataSubjectService.dispatchEvent(response.data) ;
                setTimeout(()=>{
                    this.router.navigateByUrl('apps/event-detail/detail/'+response.data.id) ;
                }, 2000) ;
            } else {
               this.errorMessage = response.message ;
               this.showAlert('error_on_save') ;
            }
        }, error => {
            console.log(error) ;
            this.errorMessage = "Veuillez Ressayer !" ;
            this.showAlert('error_on_save') ;
        }) ;
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

    getTotalTickets(): string {
        this.totalTicketAvailable = 0 ;
        this.formGroup.value.listTicketPrice.forEach(ticketPrice => {
            this.totalTicketAvailable += ticketPrice.initialQuantityAvailable ;
        }) ;
        return ''+this.totalTicketAvailable ;
    }
}


