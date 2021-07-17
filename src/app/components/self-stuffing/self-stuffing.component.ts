import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-selfstuffing',
  templateUrl: './self-stuffing.component.html',
  styleUrls: ['./self-stuffing.component.scss']
})
export class SelfStuffingComponent implements OnInit {
  public closeResult: string;
  public generalForm: FormGroup;
  public restrictionForm: FormGroup;
  public usageForm: FormGroup;
  public model: NgbDateStruct;
  public date: { year: number, month: number };
  public modelFooter: NgbDateStruct;
  icdList: string[] = [];
  postList: string[] = [];
  icdListtrue: boolean = false;
  postListtrue: boolean = false
  dropdownSettingPOST: IDropdownSettings = {
    singleSelection: false,
    idField: 'portValue',
    textField: 'portValue',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };
  dropdownSettingICD: IDropdownSettings = {
    singleSelection: false,
    idField: 'icdValue',
    textField: 'icdValue',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private modalService: NgbModal,
    private service: PinwheelService) {
    this.createGeneralForm();
    this.createRestrictionForm();
    this.createUsageForm();
  }
  
  ngOnInit() {
    this.getDropdownList() 
   }

   getDropdownList() {
     this.service.getIDCList().subscribe((res) => {
       if (res) {
         this.icdList = res;
       }
     },
       (err) => {
         console.log(err)
       })

     this.service.getPOSTList().subscribe((res) => {
       if (res) {
         this.postList = res;
       }
     },
       (err) => {
         console.log(err)
       })
   }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      sealNo: [''],
    });
  }

  createRestrictionForm() {
    this.restrictionForm = this.formBuilder.group({
      shippingBillDate: [''],
      shippingBilllNo: [''],
      ewayBillNo: [''],
      sealingDate: [],
      sealingTime: [],
      min:[],
      max:[],
      containerNo: [],
      trailerNo: [],
      sendToICDs:[Validators.required],
      sendToPorts: [Validators.required]
    })
  }

  createUsageForm() {
    this.usageForm = this.formBuilder.group({
      limit: [''],
      customer: ['']
    })
  }

  calculateTime(){
    let time = this.restrictionForm.value.max - this.restrictionForm.value.min;
    return time;
  }

  submit() {
    let payload = {
      "vendorId": 2,
      "containerNo": this.restrictionForm.value.containerNo,
      "sealNo": this.generalForm.value.sealNo,
      "sealingDate": this.restrictionForm.value.sealingDate,
      "sealingTime": this.calculateTime(),
      "sendToICDs": this.restrictionForm.value.sendToICDs,
      "sendToPorts": this.restrictionForm.value.sendToPorts,
      "shippingBillDetails": [{
        "ewayBillNo": this.restrictionForm.value.ewayBillNo,
        "shippingBillDate": this.restrictionForm.value.shippingBillDate,
        "shippingBilllNo": this.restrictionForm.value.shippingBilllNo,
      }],
      "status": "Installed",
      "trailerNo": this.restrictionForm.value.trailerNo
    }
    this.service.saveSelfStuffing(payload).subscribe((res) => {
      if (res.status === status.SUCCESS) {
        //TODO:pop-up
      }
     }, 
    (err) =>{
      console.log(err)
    })
  }
 
}
