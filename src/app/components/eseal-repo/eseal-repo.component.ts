import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-esealrepo',
  templateUrl: './eseal-repo.component.html',
  styleUrls: ['./eseal-repo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EsealrepoComponent {
  values = [];
  constructor() {
  }

  removevalue(i){
    this.values.splice(i,1);
  }

  addvalue(){
    this.values.push({value: ""});
  }
}
