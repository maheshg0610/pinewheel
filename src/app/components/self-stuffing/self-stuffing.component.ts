import { Component, OnInit, ViewEncapsulation, ViewChild, } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import {  NgbNav } from '@ng-bootstrap/ng-bootstrap';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-selfstuffing',
  templateUrl: './self-stuffing.component.html',
  styleUrls: ['./self-stuffing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelfStuffingComponent implements OnInit {
  user: any;
  @ViewChild('nav', { static: false }) set content(content: NgbNav) {
   // this.tabSet = content;
  }
  public closeResult: string;
  public generalForm: FormGroup;
  public restrictionForm: FormGroup;
  public usageForm: FormGroup;
  public model: NgbDateStruct;
  public date: { year: number, month: number };
  public modelFooter: NgbDateStruct;
  icdList: string[] = [];
  portList: string[] = [];
  icd: string[] = [];
  port: string[] = [];
  isLoading: boolean = false;
  stateList: string[] = [];
  countryList: string[] = [];
  cityList: string[] = []
  dropdownSettingPORT: IDropdownSettings = {
    singleSelection: false,
    idField: 'portId',
    textField: 'portValue',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };
  dropdownSettingICD: IDropdownSettings = {
    singleSelection: false,
    idField: 'icdId',
    textField: 'icdValue',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  dropdownSettingcountry: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  dropdownSettingstate: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };
  dropdownSettingcity: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private modalService: NgbModal,
    private service: PinwheelService) {
  }
  
  ngOnInit() {
    this.getDropdownList() 
    this.createGeneralForm();
    this.createRestrictionForm();
    this.createUsageForm();
    this.user = JSON.parse(localStorage.getItem('user'));
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

     this.service.getPORTList().subscribe((res) => {
       if (res) {
         this.portList = res;
       }
     },
       (err) => {
         console.log(err)
    })

     this.service.getCountryId().subscribe((res) => {
       if (res) {
         this.countryList = res;
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
      sealingDate: [''],
      sealingTime: [''],
      containerNo: [''],
      shippingBillDetails: this.formBuilder.array([]),
      trailerNo: [''],
      sendToICDs:['',Validators.required],
      sendToPorts: ['',Validators.required]
    })
    this.addMoreFeild()
  }

  get shippingBillDetails() {
    return this.restrictionForm.controls["shippingBillDetails"] as FormArray;
  }

  createUsageForm() {
    this.usageForm = this.formBuilder.group({
      limit: [''],
      customer: ['']
    })
  }

  appendData() {
    this.port = [];
    this.icd = [];
    let pv = this.restrictionForm.value.sendToPorts
    pv.map((ele) => { this.port.push(ele.portId) })
    let ic = this.restrictionForm.value.sendToICDs
    ic.map((ele) => { this.icd.push(ele.icdId) })
  }
  
  formateDate(val){
    if (val && val.toString().split("").length === 1){
      return '0'+val
    }
    return val
  }
  updateData(val) {
    if(val) {
      val.map((ele) => {
        if (ele.shippingBillDate) {
          ele.shippingBillDate = ele.shippingBillDate.year + '-' + this.formateDate(ele.shippingBillDate.month) + '-' + this.formateDate(ele.shippingBillDate.day)
        }
        if (ele.cityId) {
          ele.cityId = ele.cityId[0].id;
        }
        if (ele.stateId) {
          ele.stateId = ele.stateId[0].id;
        }
        if (ele.countryId) {
          ele.countryId = ele.countryId[0].id;
        }
      })
      return val;
    } else {
      return val;
    }

  }

  submit() {
    this.isLoading  = true;
    this.appendData() 
    let payload = {
      "vendorId": this.user.vendorId,
      "containerNo": this.restrictionForm.value.containerNo,
      "sealNo": this.generalForm.value.sealNo,
      "sealingDate": this.restrictionForm.value.sealingDate.year + '-' + this.formateDate(this.restrictionForm.value.sealingDate.month) +'-' + this.formateDate(this.restrictionForm.value.sealingDate.day),
      "sealingTime": this.restrictionForm.value.sealingTime +':00',
      "sendToICDs": this.icd,
      "sendToPorts": this.port,
      "shippingBillDetails": this.updateData(this.restrictionForm.value.shippingBillDetails),
      "status": "Installed",
      "trailerNo": this.restrictionForm.value.trailerNo
    }
    this.service.saveSelfStuffing(payload).subscribe((res) => {
      this.isLoading = false;
      alert(res.statusText)
      this.port = [];
      this.icd = [];
      this.restrictionForm.reset();
      this.generalForm.reset()
     }, 
    (err) =>{
      this.isLoading = false;
      alert(err.error.statusText)
    })
  }
  

  addMoreFeild(){
    const add = this.restrictionForm.get('shippingBillDetails') as FormArray;
    add.push(this.formBuilder.group({
      shippingBillDate: [''],
      shippingBillNo: [''],
      ewayBillNo: [''],
      cityId: [''],
      stateId: [''],
      countryId: ['']
    }))
  }

  deleteRow(i:number) {
    const add = this.restrictionForm.get('shippingBillDetails') as FormArray;
    add.removeAt(i)
  }

  onCountrySelect(event) {
    this.service.getStateID(event.id).subscribe((res) => {
      if (res) {
        this.stateList = res;
      }
    },
      (err) => {
        console.log(err)
      })
  }

  onStateSelect(event) {
    this.service.getCityID(event.id).subscribe((res) => {
      if (res) {
        this.cityList = res;
      }
    },
      (err) => {
        console.log(err)
      })
  }
}
