import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormsModule, Validators} from '@angular/forms';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {
  public vendorMangementForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service:PinwheelService) {}

  ngOnInit() {
    this.createVendorRegisterForm()
  }

  createVendorRegisterForm() {
    this.vendorMangementForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['', Validators.required, Validators.email],
      portIds: ['', Validators.required],
      icdIds: ['', Validators.required],
      noOfSeal: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      companyName: ['', Validators.required],
      iec: ['', Validators.required],
      chaIds: ['', Validators.required],
      cfsIds: ['', Validators.required],
      agree: [false, Validators.required],
      isDistributer: []
    });
  }

  get f() {
    return this.vendorMangementForm.controls;
  }

  onSubmit() {
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
        "userId": 2,  //Here userId is super adminuserid
        "vendorType": "Exporter",
        "companyName": this.vendorMangementForm.value.companyName,
        "iec": this.vendorMangementForm.value.iec,
        "firstName": this.vendorMangementForm.value.firstName,
        "password": this.vendorMangementForm.value.password,
        "lastName": this.vendorMangementForm.value.lastName,
        "mobileNumber": this.vendorMangementForm.value.mobileNumber,
        "emailId": this.vendorMangementForm.value.emailId,
        "portIds": [this.vendorMangementForm.value.portIds],
        "icdIds": [this.vendorMangementForm.value.icdIds],
        "isDistributer": this.vendorMangementForm.value.isDistributer,
        "noOfSeal": this.vendorMangementForm.value.noOfSeal,
        "chaIds": [this.vendorMangementForm.value.chaIds],
        "cfsIds": [this.vendorMangementForm.value.cfsIds]
      }
      this.service.registerEseal(payload).subscribe((res) => {
        if (res.status === status.SUCCESS) {
          //TODO:pop-up
          alert(res.statusText)
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
