import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esealtransfer',
  templateUrl: './eseal-transfer.component.html',
  styleUrls: ['./eseal-transfer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EsealTransferComponent {

  vendorForm:FormGroup;
  user: any;
  esealList: string[] = [];
  eSeal: string[] = [];
  vendorList: any;
  constructor(public service: PinwheelService, private formBuilder:FormBuilder, private _router:Router) {
  }
  dropdownSetting: IDropdownSettings = {
    singleSelection: false,
    idField: 'esealId',
    textField: 'esealNumber',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  vdropdownSetting: IDropdownSettings = {
    singleSelection: true,
    idField: 'vendorId',
    textField: 'vendorName',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };
  
  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.service.rowDataTransfer){
      this.getSealList(this.service.rowDataTransfer.noOfEsealRequested)
        this.vendorForm = this.formBuilder.group({
          esealIds: [{ value: this.service.rowDataTransfer.eSealRequestId, disabled: true }],
          vendorName: [{value:this.service.rowDataTransfer.vendorName, disabled: true}],
          noOfEsealRequested: [{ value: this.service.rowDataTransfer.noOfEsealRequested, disabled: true}] 
        })
    } else {
      this.getVendorList()
      this.vendorForm = this.formBuilder.group({
        esealIds: [''],
        vendorName: [''],
        noOfEsealRequested: ['']
      })
    }
  }

  getSealList(num) {
    this.service.getEsealList(num).subscribe((res) => {
      if (res.status === status.success) {
        this.esealList = res.data;
      } else {
        alert(res.statusText)
      }
    },
      (err) => {
        console.log(err)
      })
  }

  get f() {
    return this.vendorForm.controls;
  }
  appendData() {
    this.eSeal = [];
    let seal = this.vendorForm.controls['esealIds'].value
    seal.map((ele) => { this.eSeal.push(ele.esealId) })
  }

  onSubmit() {
    this.appendData()
    let payload = { "adminUserId": this.user.userId, "noOfSeals": this.vendorForm.value.noOfEsealRequested,
      "esealIds": this.eSeal, "status": 'transferred' }
    if (this.service.rowDataTransfer) {
      payload["eSealRequestId"]= this.service?.rowDataTransfer['eSealRequestId']
    }
    this.service.adminAccept(payload).subscribe((res) => {
      if (res.status === status.success) {
        alert(res.statusText);
        this._router['/dashboard/superadmin']
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  callApi() {
    this.getSealList(this.vendorForm.value.noOfEsealRequested)
  }

  getVendorList() {
    this.service.vendoeListForActivation(this.user.userId).subscribe((res) => {
      if (res) {
        this.vendorList = res.data;
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  ngOnDestroy() {
    this.vendorForm.reset()
    this.service.rowDataTransfer = '';
   }
  
}
