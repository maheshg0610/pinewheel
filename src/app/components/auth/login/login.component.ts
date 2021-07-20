import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { status } from 'src/app/shared/config/endpoint.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    // {
    //   title: "Welcome to PinWheel",
    //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    // },
    // {
    //   title: "Welcome to PinWheel",
    //   desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    // },
    {
      title: 'Welcome to PinWheel',
      desc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy."
    }
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      loginId: [''],
      password: ['']
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      loginId: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (
      this.loginForm.controls['loginId'].value == '' ||
      this.loginForm.controls['password'].value == ''
    ) {
      return;
    }
    let paylod = this.loginForm.value;
    this.authService.login(paylod).subscribe(
      response => {
        if (response.StatusText === status.SUCCESS) {
          this.router.navigate(['/dashboard/default']);
        } else {
          //TODO:pop-up
        }
      },
      error => {
        //TODO:pop-up
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['auth/forgotpassword']);
  }
}
