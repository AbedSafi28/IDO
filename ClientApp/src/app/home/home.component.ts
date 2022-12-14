import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  http: HttpClient;
  baseUrl: string;
  loginForm: FormGroup;
  emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private router: Router, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern(this.emailRegex)
        ],
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
    });
  }

  onSubmit(formData: any): void {
    if (Object.keys(formData) && formData.email && formData.password) {
      this.http.post(this.baseUrl + 'login', formData).subscribe(
        (response: any) => {
          if (response.success) {
            const loginCookie = document.cookie;
            if (loginCookie) {
              const splittedCookie = loginCookie.split('=');
              if (splittedCookie?.length === 2) {
                localStorage.setItem('ido-login', splittedCookie[1]);
                this.router.navigate(['/mylist']);
              }
            }
          }
        },
        (error) => {
        }
      );
    }
    this.loginForm.reset();
  }
}
