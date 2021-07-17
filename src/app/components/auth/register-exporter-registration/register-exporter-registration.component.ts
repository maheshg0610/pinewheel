import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {}
}
