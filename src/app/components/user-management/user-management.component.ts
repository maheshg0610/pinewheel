import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormsModule, Validators} from '@angular/forms';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserMangementComponent implements OnInit {
  public userManagementForm: FormGroup;
  portList: string[] = [];
  user:any;

  dropdownSettingPORT: IDropdownSettings = {
    singleSelection: true,
    idField: 'portId',
    textField: 'portValue',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  constructor(private formBuilder: FormBuilder, private service:PinwheelService) {}

  ngOnInit() {
    this.getDropdownList()
    this.createVendorRegisterForm()
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  createVendorRegisterForm() {
    this.userManagementForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      emailId: ['', Validators.required],
      portId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roleName: ['', Validators.required]
    });
  }

  getDropdownList() {
    this.service.getPORTList().subscribe((res) => {
      if (res) {
        this.portList = res;
      }
    }, (err) => { console.log(err) })
  }

  get f() {
    return this.userManagementForm.controls;
  }

  onSubmit() {
    if(!this.userManagementForm.valid) {
      alert('Please fill all feilds')
      return;
    }
    if (this.userManagementForm.value.password !== this.userManagementForm.value.confirmPassword){
      alert('Please Enter same password');
      return;
    }
    if (this.userManagementForm.valid) {
      let payload = {
        "userId": this.user.userId, 
        "firstName": this.userManagementForm.value.firstName,
        "userName": this.userManagementForm.value.userName,
        "password": this.userManagementForm.value.password,
        "lastName": this.userManagementForm.value.lastName,
        "phoneNo": this.userManagementForm.value.phoneNo,
        "emailId": this.userManagementForm.value.emailId,
        "portId": this.userManagementForm.value.portId[0].portId
      }
      this.service.saveUser(payload).subscribe((res) => {
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
      alert('All feilds are Mandatory, please input valid data.')
    }
  }
}
