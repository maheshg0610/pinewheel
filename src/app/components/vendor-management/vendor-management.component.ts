import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-vendor-management',
  templateUrl: './vendor-management.component.html',
  styleUrls: ['./vendor-management.component.scss']
})
export class VendorManagementComponent implements OnInit {
  public vendorMangementForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {}
}
