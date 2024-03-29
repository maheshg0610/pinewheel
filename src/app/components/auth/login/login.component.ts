import { ActivatedRoute, Router } from '@angular/router';
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
  public isAdmin =  false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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

  ngOnInit() {
    if (this.route.snapshot.routeConfig.path === "auth/login/admin"){
      this.isAdmin=true;
    }
  }

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
          if (response.roleName === 'SuperAdmin') {
            this.router.navigate(['/dashboard/superadmin']);
          } else if (response.roleName === 'Custome Office') {
            this.router.navigate(['auth/login']);
          }
          else {
            this.router.navigate(['/dashboard/default']);
          }
        } else {
          alert(response.StatusText)
        }
      },
      error => {
        alert(error.StatusText)
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['auth/forgotpassword']);
  }
}
