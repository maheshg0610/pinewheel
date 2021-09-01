import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';

@Component({
  selector: 'app-esealrepo',
  templateUrl: './eseal-repo.component.html',
  styleUrls: ['./eseal-repo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EsealrepoComponent {
  user: any;
  repoForm:FormGroup;
  esealList: string[] = [];
  startSeal: string[] = [];
  endSeal: string[] = [];
  isEseal:boolean = false;
  constructor(private service: PinwheelService, private formBuilder: FormBuilder) {
  }
  dropdownSetting: IDropdownSettings = {
    singleSelection: false,
    idField: 'esealId',
    textField: 'esealNumber',
    itemsShowLimit: 4,
    enableCheckAll: false,
    searchPlaceholderText: 'Select',
  };

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.repoForm = this.formBuilder.group({
      noOfSeals: ['', Validators.required],
      stratSealRange: ['', Validators.required],
      endSealRange: ['', Validators.required],
    })
  }

  appendData() {
    let seal = this.repoForm.controls['stratSealRange'].value
    seal.map((ele) => { this.startSeal.push(ele.esealId) })
    this.validateRange(this.startSeal)
    let eseal = this.repoForm.controls['endSealRange'].value
    eseal.map((ele) => { this.endSeal.push(ele.esealId) })
    this.validateRange(this.endSeal)
  }

  getSealList() {
    this.service.getEsealList(this.repoForm.controls['noOfSeals'].value).subscribe((res) => {
      if (res.status === status.success) {
        this.esealList = res.data;
      } else {
        alert(res.statusText)
      }
    }, (err) => { console.log(err) })
  }

  validateRange(val) {
    this.service.validateEsealRange(val).subscribe((res) => {
      if (res.status === status.success) {
        //continue..
      } else {
        alert(res.statusText)
        return;
      }
    }, (err) => { console.log(err) })
  }

  onSubmit() {
    this.appendData()
    let payload = {
      "adminId": this.user.userId, "noOfSeals": this.repoForm.controls['noOfSeals'].value,
      "stratSealRange": this.startSeal, "endSealRange": this.endSeal
    }
    this.service.addInventory(payload).subscribe((res) => {
      if (res.status === status.success) {
        alert(res.statusText);
      } else {
        alert(res.statusText);
      }
    },(err) => { console.log(err) })
  }

  onKey(event) {
    this.isEseal = true;
    if (this.repoForm.controls['noOfSeals'].value !== "") { 
      this.getSealList()
    }
  }

}
