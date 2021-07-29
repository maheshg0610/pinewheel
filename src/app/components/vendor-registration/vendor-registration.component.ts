import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormsModule, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent implements OnInit {

  updateSearchResults: Subscription
  constructor(private formBuilder: FormBuilder, private service:PinwheelService) {}

  icdList: string[] = [];
  portList: string[] = [];
  chaList: string[] = [];
  cfsList: string[] = [];
  dropdownSettingCha: IDropdownSettings = {
    singleSelection: false,
    idField: 'chaId',
    textField: 'name',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };
  dropdownSettingCfs: IDropdownSettings = {
    singleSelection: false,
    idField: 'cfsId',
    textField: 'name',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };
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


  ngOnInit() {
    this.updateSearchResults = this.service.updateSearchResults$.subscribe((data) => {
      if (data) {
        this.formData= data;
      }
    })
    this.getDropdownList();
    this.createRegistrationForm();
  }
  public formData:any;
  public registrationForm: FormGroup;

  get f() {
    return this.registrationForm.controls;
  }

  createRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      userId: [this.formData.userId ?this.formData.userId : ''],
      vendorId: [this.formData.vendor ? this.formData.vendor : ''],
      emailId: [this.formData.emailId ? this.formData.emailId : ''],
      iecNumber: [this.formData.iecNumber ? this.formData.iecNumber : ''],
      icdIds: [this.formData.icdsList ? this.formData.icdsList : ''], 
      portIds: [this.formData.portList ? this.formData.portList : ''], 
      mobileNumber: [this.formData.mobileNumber ? this.formData.mobileNumber : ''],
      noOfSealRequired: [this.formData.noOfSealRequired ? this.formData.noOfSealRequired : ''],
      phoneNumber: [this.formData.phoneNumber ? this.formData.phoneNumber : ''],
      vendorName: [this.formData.vendorName ? this.formData.vendorName : ''],
      vendortype: [this.formData.vendortype ? this.formData.vendortype : ''],
      createdDate: [this.formData.createdDate ? this.formData.createdDate : ''],
      distributor: [this.formData.distributor ? this.formData.distributor : ''],
      status: [this.formData.status ? this.formData.status : ''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      chaIds: [this.formData.chaIds ? this.formData.chaIds : ''],
      cfsIds: [this.formData.chaIds ? this.formData.chaIds : '']
    })
  }

  onSumbit(){
    // if (this.registrationForm.controls['password'] != this.registrationForm.controls['confirmPassword'] ){
    //   return;
    // }
    let payload = {
      "vendorId": this.formData.vendorId,
      "password": this.registrationForm.controls['password'].value
    }
    this.service.activateVendor(payload).subscribe((res) => {
      if (res) {
        alert(res.statusText);
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
  }

  getDropdownList() {
    this.service.getIDCList().subscribe((res) => {
      if (res) {
        this.icdList = res;
      }
    }, (err) => { console.log(err) })

    this.service.getPORTList().subscribe((res) => {
      if (res) {
        this.portList = res;
      }
    }, (err) => { console.log(err) })

    this.service.getCHAList().subscribe((res) => {
      if (res) {
        this.chaList = res;
      }
    }, (err) => { console.log(err) })

    this.service.getCFSList().subscribe((res) => {
      if (res) {
        this.cfsList = res;
      }
    }, (err) => { console.log(err) })
  }

}
