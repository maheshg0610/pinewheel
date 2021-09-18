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
  constructor(private service: PinwheelService, private formBuilder:FormBuilder, private _router:Router) {
  }
  dropdownSetting: IDropdownSettings = {
    singleSelection: false,
    idField: 'esealId',
    textField: 'esealNumber',
    itemsShowLimit: 4,
    enableCheckAll: true,
    searchPlaceholderText: 'Select',
  };
  
  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.service.rowDataTransfer){
      this.getSealList()
        this.vendorForm = this.formBuilder.group({
          esealIds: [{ value: this.service.rowDataTransfer.eSealRequestId, disabled: true }],
          vendorName: [{value:this.service.rowDataTransfer.vendorName, disabled: true}],
          noOfEsealRequested: [{ value: this.service.rowDataTransfer.noOfEsealRequested, disabled: true}] 
        })
    }
  }

  getSealList() {
    this.service.getEsealList(this.service.rowDataTransfer.noOfEsealRequested).subscribe((res) => {
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
  appendData() {
    let seal = this.vendorForm.controls['esealIds'].value
    seal.map((ele) => { this.eSeal.push(ele.esealId) })
  }

  onSubmit() {
    this.appendData()
    let payload = { "adminUserId": this.user.userId, "eSealRequestId": this.service.rowDataTransfer['eSealRequestId'], "noOfSeals": this.service.rowDataTransfer.noOfEsealRequested,
      "esealIds": this.eSeal, "status": 'transferred' }
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

  
}
