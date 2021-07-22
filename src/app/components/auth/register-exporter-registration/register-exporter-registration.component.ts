import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { status } from 'src/app/shared/config/endpoint.config';

@Component({
  selector: 'app-register-exporter-registration',
  templateUrl: './register-exporter-registration.component.html',
  styleUrls: ['./register-exporter-registration.component.scss']
})
export class RegisterExporterRegistrationComponent implements OnInit {
  public registerForm: FormGroup;
  toppings = new FormControl();

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato'
  ];
  constructor(private formBuilder: FormBuilder, private service: PinwheelService) {
    this.createRegisterForm();
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
      isDistributer: []
    });
  }



  ngOnInit() {}

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
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
        "portIds": [this.registerForm.value.portIds],
        "icdIds": [this.registerForm.value.icdIds],
        "isDistributer": this.registerForm.value.isDistributer,
        "noOfSeal": this.registerForm.value.noOfSeal,
        "chaIds": [this.registerForm.value.chaIds],
        "cfsIds": [this.registerForm.value.cfsIds]
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
