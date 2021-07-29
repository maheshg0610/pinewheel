import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-register-exporter-registration',
  templateUrl: './register-exporter-registration.component.html',
  styleUrls: ['./register-exporter-registration.component.scss']
})
export class RegisterExporterRegistrationComponent implements OnInit {
  public registerForm: FormGroup;
  icdList: string[] = [];
  portList: string[] = [];
  chaList: string[] = [];
  cfsList: string[] = [];
  icd: string[] = [];
  port: string[] = [];
  cha: string[] = [];
  cfs: string[] = [];

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

  constructor(private formBuilder: FormBuilder, private service: PinwheelService) {
    this.getDropdownList();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      emailId: ['',Validators.required],
      portIds: ['', Validators.required],
      icdIds: ['', Validators.required],
      noOfSeal: ['', Validators.required],
      companyName: ['', Validators.required],
      iec: ['', Validators.required],
      chaIds: ['', Validators.required],
      cfsIds: ['', Validators.required],
      agree: [false, Validators.required],
      isDistributer: ['']
    });
  }



  ngOnInit() {
  
    this.createRegisterForm();
  }

  getDropdownList() {
    this.service.getIDCList().subscribe((res) => {
      if (res) {
        this.icdList = res;
      }
    },(err) => {console.log(err)})

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

  get f() {
    return this.registerForm.controls;
  }

  appendData() {
    let pv =this.registerForm.value.portIds
    pv.map((ele) => { this.port.push(ele.portId) })
    let ic = this.registerForm.value.icdIds
    ic.map((ele) => { this.icd.push(ele.icdId) })
    let ch = this.registerForm.value.chaIds
    ch.map((ele) => { this.cha.push(ele.chaId) })
    let cf = this.registerForm.value.cfsIds
    cf.map((ele) => { this.cfs.push(ele.cfsId) })
  }

  onSubmit() {
    this.appendData()
    if (!this.registerForm.valid) {
      alert('Please fill all feilds')
      return;
    }
    if (this.registerForm.value.agree){
      let payload = { 
        "vendorType": "Exporter",
        "companyName": this.registerForm.value.companyName,
        "iec": this.registerForm.value.iec,
        "firstName": this.registerForm.value.firstName,
        "lastName": this.registerForm.value.lastName,
        "mobileNumber": this.registerForm.value.mobileNumber,
        "emailId": this.registerForm.value.emailId,
        "portIds": this.port,
        "icdIds": this.icd,
        "isDistributer": this.registerForm.value.isDistributer,
        "noOfSeal": this.registerForm.value.noOfSeal,
        "chaIds": this.cha,
        "cfsIds": this.cfs
      }
      this.service.registerEseal(payload).subscribe((res) => {
        if (res.status === status.SUCCESS) {
          //TODO:pop-up
          alert(res.statusText);
        } else {
          alert(res.statusText);
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
