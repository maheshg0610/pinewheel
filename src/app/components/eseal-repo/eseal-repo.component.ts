import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

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


  onSubmit() {
    if(this.repoForm.valid){
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
      }, (err) => { console.log(err) })
    } else {
      this.repoForm.markAllAsTouched();
    }
  }

  onKeyChange() {
    if (this.repoForm.controls['stratSealRange'].value !== "" && this.repoForm.controls['noOfSeals'].value !== "") { 
      this.service.validateEsealRange(this.repoForm.controls['stratSealRange'].value).subscribe((res) => {
        if (res.status === status.success) {
          let value = this.repoForm.controls['stratSealRange'].value;
          let str = value.slice(0, 3);
          let num = this.repoForm.controls['noOfSeals'].value + parseInt(value.slice(3));
          value = str + (num -1);
          this.repoForm.controls['endSealRange'].setValue(value)
        } else {
          alert(res.statusText)
        }
      }, (err) =>
        { console.log(err), 
          alert(err.error.statusText) })
    } else {
      this.repoForm.markAllAsTouched();
    }
  }

}
