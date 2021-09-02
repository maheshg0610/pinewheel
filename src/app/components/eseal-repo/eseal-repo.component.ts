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
  constructor(private service: PinwheelService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.repoForm = this.formBuilder.group({
      noOfSeals: ['', Validators.required],
      stratSealRange: ['', Validators.required],
      endSealRange: ['', Validators.required],
    })
  }

  validateRange(val) {
    this.service.validateEsealRange(val).subscribe((res) => {
      if (res.status === status.success) {
        //continue..
      } else {
        alert(res.statusText)
      }
    }, (err) => { console.log(err) })
  }

  onSubmit() {
    let payload = {
      "adminId": this.user.userId, "noOfSeals": this.repoForm.controls['noOfSeals'].value,
      "stratSealRange": this.repoForm.controls['stratSealRange'].value, "endSealRange": this.repoForm.controls['endSealRange'].value, 
    }
    this.service.addInventory(payload).subscribe((res) => {
      if (res.status === status.success) {
        alert(res.statusText);
      } else {
        alert(res.statusText);
      }
    },(err) => { console.log(err) })
  }

  onKey() {
    if (this.repoForm.controls['stratSealRange'].value !== "") { 
      this.validateRange(this.repoForm.controls['stratSealRange'].value)
      let value = this.repoForm.controls['stratSealRange'].value ;
      let str = value.slice(0,2);
      let num = value.slice(2);
      value = value + this.repoForm.controls['noOfSeals'].value;
      this.repoForm.controls['endSealRange'].setValue(value)
    }
  }

}
