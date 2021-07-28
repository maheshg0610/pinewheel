import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormsModule, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';


@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent implements OnInit {

  updateSearchResults: Subscription
  constructor(private formBuilder: FormBuilder, private service:PinwheelService) {}

  ngOnInit() {
    this.updateSearchResults = this.service.updateSearchResults$.subscribe((data) => {
      if (data) {
        this.formData= data;
        console.log(data)
      }
    })
    this.createRegistrationForm()
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
      icdsList: [this.formData.icdsList ? this.formData.icdsList : ''], 
      portList: [this.formData.portList ? this.formData.portList : ''], 
      mobileNumber: [this.formData.mobileNumber ? this.formData.mobileNumber : ''],
      noOfSealRequired: [this.formData.noOfSealRequired ? this.formData.noOfSealRequired : ''],
      phoneNumber: [this.formData.phoneNumber ? this.formData.phoneNumber : ''],
      vendorName: [this.formData.vendorName ? this.formData.vendorName : ''],
      vendortype: [this.formData.vendortype ? this.formData.vendortype : ''],
      createdDate: [this.formData.createdDate ? this.formData.createdDate : ''],
      distributor: [this.formData.distributor ? this.formData.distributor : ''],
      status: [this.formData.status ? this.formData.status : ''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
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

}
