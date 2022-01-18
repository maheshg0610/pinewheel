import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormsModule, Validators} from '@angular/forms';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {
  public vendorMangementForm: FormGroup;
  icdList: string[] = [];
  portList: string[] = [];
  // chaList: string[] = [];
  // cfsList: string[] = [];
  icd: string[] = [];
  port: string[] = [];
  // cha: string[] = [];
  // cfs: string[] = [];
  user:any;
  // dropdownSettingCha: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: 'chaId',
  //   textField: 'name',
  //   itemsShowLimit: 4,
  //   enableCheckAll: false,
  //   searchPlaceholderText: 'Select',
  // };
  // dropdownSettingCfs: IDropdownSettings = {
  //   singleSelection: false,
  //   idField: 'cfsId',
  //   textField: 'name',
  //   itemsShowLimit: 4,
  //   enableCheckAll: false,
  //   searchPlaceholderText: 'Select',
  // };
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


  constructor(private formBuilder: FormBuilder, private service:PinwheelService,
    private router :Router) {}

  ngOnInit() {
    this.getDropdownList()
    this.createVendorRegisterForm()
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  createVendorRegisterForm() {
    this.vendorMangementForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['', Validators.required],
      portIds: ['', Validators.required],
      icdIds: ['', Validators.required],
      noOfSeal: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
      iec: ['', Validators.required],
      chaorCfa: ['', Validators.required],
      agree: [false, Validators.required],
      isDistributer: []
    });
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

    // this.service.getCHAList().subscribe((res) => {
    //   if (res) {
    //     this.chaList = res;
    //   }
    // }, (err) => { console.log(err) })

    // this.service.getCFSList().subscribe((res) => {
    //   if (res) {
    //     this.cfsList = res;
    //   }
    // }, (err) => { console.log(err) })
  }

  get f() {
    return this.vendorMangementForm.controls;
  }

  appendData() {
    let pv = this.vendorMangementForm.value.portIds
    pv.map((ele) => { this.port.push(ele.portId) })
    let ic = this.vendorMangementForm.value.icdIds
    ic.map((ele) => { this.icd.push(ele.icdId) })
    // let ch = this.vendorMangementForm.value.chaIds
    // ch.map((ele) => { this.cha.push(ele.chaId) })
    // let cf = this.vendorMangementForm.value.cfsIds
    // cf.map((ele) => { this.cfs.push(ele.cfsId) })
  }

  onSubmit() {
    this.appendData()
    if(!this.vendorMangementForm.valid) {
      alert('Please fill all feilds')
      return;
    }
    if (this.vendorMangementForm.value.password !== this.vendorMangementForm.value.confirmPassword){
      alert('Please Enter same password');
      return;
    }
    if (this.vendorMangementForm.value.agree) {
      let payload = {
        "userId": this.user.userId, 
        "vendorType": "Exporter",
        "companyName": this.vendorMangementForm.value.companyName,
        "iec": this.vendorMangementForm.value.iec,
        "firstName": this.vendorMangementForm.value.firstName,
        "userName": this.vendorMangementForm.value.userName,
        "password": this.vendorMangementForm.value.password,
        "lastName": this.vendorMangementForm.value.lastName,
        "mobileNumber": this.vendorMangementForm.value.mobileNumber,
        "emailId": this.vendorMangementForm.value.emailId,
        "portIds": this.port,
        "icdIds": this.icd,
        "isDistributer": this.vendorMangementForm.value.isDistributer,
        "noOfSeal": this.vendorMangementForm.value.noOfSeal,
        "isCha": this.vendorMangementForm.value.chaorCfa === "true" ? true :false,
        "isCfs": this.vendorMangementForm.value.chaorCfa === "false" ? true : false

      }
      this.service.registerEseal(payload).subscribe((res) => {
        if (res.status === status.SUCCESS) {
          alert(res.statusText)
          this.router.navigateByUrl('vendor-list/vendorlist')
        } else {
          alert(res.statusText)
        }
      },
        (err) => {
          console.log(err)
        })
    } else {
      alert('Please agree to terms and condition')
    }
  }
}
